import express, { response } from 'express'
import bodyParser from 'body-parser'
import pg from 'pg'
import bcrypt from 'bcrypt'
import cors from 'cors'
import env from 'dotenv'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'


// Initialize app and middleware
const app = express();
const port = 4000;
const saltRounds = 10;
const uploadMiddleware = multer({ dest: 'Uploads/' });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
env.config();
const secret = process.env.SECRET;

// Database connection
const db = new pg.Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
});
db.connect();

// Middleware setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/Uploads', express.static(`${__dirname}/Uploads`));


// Routes

// Public Routes

app.get('/books', async (req, res) => {
    const result = await db.query('SELECT * FROM books ORDER BY RANDOM() LIMIT 10');
    res.json(result.rows);
});

app.get('/book/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.query('SELECT * FROM books WHERE id=$1', [id]);
    res.json(result.rows);
});

app.post('/register', async (req, res) => {
    const { username, full_name, email, password } = req.body;
    try {
        const checkUser = await db.query('SELECT * FROM users WHERE username=$1', [username]);

        if (checkUser.rows.length === 0) {
            const checkEmail = await db.query('SELECT * FROM users WHERE email=$1', [email]);
            if (checkEmail.rows.length === 0) {
                const hash = await bcrypt.hash(password, saltRounds);
                await db.query('INSERT INTO users (username, email, password, full_name) VALUES ($1, $2, $3, $4)', [username, email, hash, full_name]);
                res.json({ success: "Registration successful! Welcome to Book Store!" });
            } else {
                res.json({ message: "This email is already registered. Please use a different email." });
            }
        } else {
            res.json({ message: "This username is already taken. Please choose a different username." });
        }
    } catch (error) {
        res.json({ message: "An error occurred during registration. Please try again." });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE username=$1 OR email=$2', [username, username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ username, id: user.id }, secret);
                res.cookie("token", token, { httpOnly: true }).json({ id: user.id, username });
            } else {
                res.json({ message: "Incorrect password. Please check your credentials and try again." });
            }
        } else {
            res.json({ message: "No account found with the provided username or email. Please check your credentials." });
        }
    } catch (error) {
        res.json({ message: "An error occurred during login. Please try again." });
    }
});

app.get('/posts', async(req,res) => {
    const result = await db.query("select * from posts ORDER BY id desc")
    res.json(result.rows)
})

app.get('/all_books', async (req, res) => {
    const result = await db.query('SELECT * FROM books ORDER BY id DESC');
    res.json(result.rows);
});

app.get('/blog/post/:id',async(req,res) =>{
    const id = parseInt(req.params.id)
    try{
        const result = await db.query('select * from posts where id=$1',[id])
        res.json(result.rows[0])
    }catch(err){
        res.json({response:"Failed to get Post data, Try again!",err})
    }
})

app.get('/shop/books/:name', async(req,res) =>{
    const name = req.params.name
    try{
        const result = await db.query('select * from books where title ILIKE $1',[`%${name}%`])
        res.json(result.rows)
    }catch(err){
        res.json(err)
    }
})



// JWT Protected Routes

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json(user);
    });
});

// Dashboard Routes

app.post('/dashboard/logout', (req, res) => {
    res.clearCookie("token").json({ message: "Logged out successfully." });
});

app.get('/dashboard/user', async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        try {
            const result = await db.query('SELECT * FROM users WHERE id=$1', [user.id]);
            res.json(result.rows[0]);
        } catch (error) {
            res.json({ response: "Failed to retrieve user data.", error });
        }
    });
});

app.get('/dashboard/books',async (req,res) =>{
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async(err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        try {
            const result = await db.query('select * from books where user_id=$1',[user.id])
            res.json(result.rows)
        } catch (error) {
            res.json({response:"Failed to get users in database, Try again!",error})
        }
    });
})

app.get('/dashboard/posts',async (req,res) =>{
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async(err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        try {
            const result = await db.query('select * from posts where user_id=$1',[user.id])
            res.json(result.rows)
        } catch (error) {
            res.json({response:"Failed to get users in database, Try again!",error})
        }
    });
})


// Books and Posts Management

// CRUD Operations for Books

app.post('/dashboard/upload-post', uploadMiddleware.single('file'), (req, res) => {
    const { title, genre, summary, content } = req.body;
    const { originalname, path } = req.file;
    const [name, ext] = originalname.split(".");
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async (err, user) => {
        if (err) throw err;
        try {
            await db.query("INSERT INTO posts (user_id, title, contenttype, summary, author, content, filepath) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
                [user.id, title, genre, summary, user.username, content, newPath]);
            res.json({sucess:"Post uploaded successfully."});
        } catch (error) {
            res.json({ error: "Failed to create post, try again." });
        }
    });
});

app.patch('/book/update/:id', async (req, res) => {
    const { bookTitle, author, bookPDFURL, bookdesc, bookimgurl, category, price } = req.body;
    const id = parseInt(req.params.id);
    const { token } = req.cookies;
    
    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    jwt.verify(token, secret, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        try {
            await db.query('UPDATE books SET title=$1, author=$2, imgpath=$3, category=$4, description=$5, bookurl=$6, price=$7 WHERE id=$8',
                [bookTitle, author, bookimgurl, category, bookdesc, bookPDFURL, price, id]);
            res.json("Book updated successfully.");
        } catch (error) {
            res.json({ response: "Failed to update book, try again.", error });
        }
    });
})

app.delete('/book/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { token } = req.cookies;
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        try {
            await db.query('DELETE FROM books WHERE id=$1', [id]);
            res.json("Book deleted successfully.");
        } catch (error) {
            res.json({ response: "Failed to delete book, try again.", error });
        }
    });
});


// CRUD Operations for Posts

app.post('/upload-book', async (req,res) => {
    const {bookTitle, author, bookPDFURL, bookdesc, bookimgurl, category, price} = req.body;
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async(err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        try {
            const result = await db.query('insert into books (user_id,title,author,imgpath,category,description,bookurl,price) values ($1,$2,$3,$4,$5,$6,$7,$8)',[user.id,bookTitle,author,bookimgurl,category,bookdesc,bookPDFURL,price])
            res.json(result)
        } catch (error) {
            res.json({response:"Failed to add in database, Try again!",error})
        }
    });

    
})

app.patch('/post/update/:id',uploadMiddleware.single('file'), async(req,res) =>{
    const { title, genre, summary, content } = req.body;
    const id = parseInt(req.params.id);

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });
        // Verify the token and get user info
        jwt.verify(token, secret, {}, async(err,user) => {
            if(err) throw err
            try {
                // Check if the file is present
                if (!req.file) {
                    // Update without file
                    await db.query('UPDATE posts SET title=$1, contenttype=$2, summary=$3, content=$4 WHERE id=$5', 
                        [title, genre, summary, content, id]);
                    res.json("Success without file");
                } else {
                    // Process the uploaded file
                    const { originalname, path } = req.file;
                    const [name, ext] = originalname.split(".");
                    const newpath = `${path}.${ext}`; // Create the new file path
            
                    // Rename the file
                    fs.renameSync(path, newpath);
            
                    // Update with file path
                    await db.query('UPDATE posts SET title=$1, contenttype=$2, summary=$3, content=$4, filepath=$5 WHERE id=$6', 
                                    [title, genre, summary, content, newpath, id]);
                    res.json("Success with file");
                }
            } catch (err) {
                res.json({ error: "Failed to update post, please try again." });
            }
            
        })
    
})

app.delete('/post/delete/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async(err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        try {
            const result = await db.query('delete from posts where id=$1',[id])
            res.json("Deleted Sucessfull")
        } catch (error) {
            res.json({response:"Failed to delete book data in database, Try again!",error})
        }
    });   
    
})

// Reviews

app.get('/reviews', async(req,res) => {
    const result = await db.query('select * from reviews')
    res.json(result.rows)
})

app.post('/review', async(req,res) =>{
    const { booktitle, bookauthor, feedback, rating, title, id} = req.body;
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async(err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        try{
            const result = await db.query('insert into reviews (user_id,book_id,title,author,rating,feedback,booktitle,username) values ($1,$2,$3,$4,$5,$6,$7,$8)',[user.id,id,title,bookauthor,rating,feedback,booktitle,user.username])
            res.json(result.rows)
        }catch(err){
            res.json(err)
        }
    })
})

// CART

app.get('/shop/cart', async(req, res) =>{
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async(err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        try {
            const result = await db.query('select * from cart where user_id=$1 ORDER BY quantity DESC',[user.id])
            res.json(result.rows)
        } catch (error) {
            res.json({response:"Failed to get cart in database, Try again!",error})
        }
    });
})

app.post('/shop/cart', async(req,res) => {
    const {id, imgpath, title, author, category, price} = req.body
    const {token} = req.cookies
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async(err, user) =>{
        if (err) return res.status(403).json({ message: 'Invalid token' });
        
        try{
            const result = await db.query('INSERT INTO cart (user_id, book_id, bookimg, booktitle, bookauthor, quantity, price, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',[user.id,id,imgpath,title,author,1,price,category])
            res.json({message: 'Item added to cart successfully'})
        }catch(err){
            res.json({response:"Failed to Insert data in cart database, Try again!",err})
        }
    })
})

app.delete('/cart/delete/:id', async(req,res)=>{
    const id = parseInt(req.params.id)
    const result = await db.query('delete from cart where id=$1',[id])
    res.json(result.data)
})

//Cart Item Increment and Decrement 

app.patch('/shop/cart/:id',async(req,res) => {
    const id = parseInt(req.params.id)
    const {option} = req.body
    if(option === "decrement"){
        const result = await db.query('update cart set quantity = greatest(quantity - 1, 0) where id=$1',[id])
        res.json("dec")
    }else{
        const result = await db.query('update cart set quantity = quantity + 1 where id=$1',[id])
        res.json("inc")
    }
})

// Get All Users

app.get('/all_users', async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        try {
            const result = await db.query('SELECT * FROM users');
            res.json(result.rows);
        } catch (error) {
            res.json({ response: "Failed to retrieve users, try again.", error });
        }
    });
});


app.listen(port, ()=>{
    console.log(`server url : http://localhost:${port}`)
})

