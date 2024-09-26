import { FaLocationArrow, FaMobileAlt, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const FooterLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Basket",
    link: "/basket",
  },
  {
    name: "Order",
    link: "/order",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const Footer = () => {
  return (
    <div className="dark:bg-gray-900 mt-auto">
        <div className="container">
            <div className="grid md:grid-cols-3 pb-2 pt-4">
                {/* Company details */}
                <div className="py-8 px-4">
                    <a href="#" className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl">Eshop</a>
                    <p className="text-gray-600 lg:pr-24 pt-3 dark:text-white/70">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cum</p>
                    <p className="text-gray-500 mt-4 dark:text-white/70">Made with 💕 by The Dilşad Rukiye Erdoğan</p>
                    <a href="https://www.linkedin.com/in/dilşad-erdoğan-089547221/" target="_blank" className="inline-block bg-red-600/90 text-white py-2 px-4 mt-4 text-sm rounded-full">Visit my Linkedin Profile</a>
                    <a href="https://github.com/dilsad-erdogan" target="_blank" className="inline-block bg-red-600/90 text-white py-2 px-4 mt-4 ml-2 text-sm rounded-full">Visit my Github Profile</a>
                </div>

                {/* Footer links */}
                <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
                    {/* First Col */}
                    <div className="py-8 px-4">
                        <h1 className="text-xl font-bold sm:text-left mb-3">Important Links</h1>
                        <ul className="space-y-3">
                            {FooterLinks.map((data) => (
                                <li key={data.name}>
                                    <a href={data.link} className="text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-white duration-300">{data.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Second Col */}
                    <div className="py-8 px-4">
                        <h1 className="text-xl font-bold sm:text-left mb-3">Quick Links</h1>
                        <ul className="space-y-3">
                            {FooterLinks.map((data) => (
                                <li key={data.name}>
                                    <a href={data.link} className="text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-white duration-300">{data.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Address */}
                    <div className="py-8 px-4 col-span-2 sm:col-auto">
                        <h1 className="text-xl font-bold sm:text-left mb-3">Address</h1>
                        <div>
                            <div className="flex items-center gap-3">
                                <FaLocationArrow />
                                <p>Selçuklu, Konya</p>
                            </div>

                            <div className="flex items-center gap-3 mt-6">
                                <FaMobileAlt />
                                <p>+90 507 184 52 46</p>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-3 mt-6">
                                <a href="#">
                                    <FaInstagram className="text-3xl hover:text-primary duration-300" />
                                </a>
                                <a href="#">
                                    <FaLinkedin className="text-3xl hover:text-primary duration-300" />
                                </a>
                                <a href="#">
                                    <FaGithub className="text-3xl hover:text-primary duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer