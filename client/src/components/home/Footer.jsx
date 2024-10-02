
import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";


export default function MyFooter(){
    return(
        <>
            <Footer bgDark>
                <div className="w-full px-4 lg:px-24">
                    <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                        <div>
                            <Footer.Title title="BOOKNEST" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">About</Footer.Link>
                                <Footer.Link href="#">Careers</Footer.Link>
                                <Footer.Link href="#">Brand Center</Footer.Link>
                                <Footer.Link href="#">Blog</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Help Center" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Discord Server</Footer.Link>
                                <Footer.Link href="#">Twitter</Footer.Link>
                                <Footer.Link href="#">Facebook</Footer.Link>
                                <Footer.Link href="#">Contact Us</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Privacy Policy</Footer.Link>
                                <Footer.Link href="#">Licensing</Footer.Link>
                                <Footer.Link href="#">Terms & Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Download" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">iOS</Footer.Link>
                                <Footer.Link href="#">Android</Footer.Link>
                                <Footer.Link href="#">Windows</Footer.Link>
                                <Footer.Link href="#">MacOS</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                    <div className="w-full bg-gray-800 px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <Footer.Copyright href="#" by="BOOKNEST" year={2024} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="#" icon={BsFacebook} />
                            <Footer.Icon href="#" icon={BsInstagram} />
                            <Footer.Icon href="#" icon={BsTwitter} />
                            <Footer.Icon href="#" icon={BsGithub} />
                        </div>
                    </div>
                </div>
            </Footer>

        </>
    )
}