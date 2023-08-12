import { SectionWrapper } from "../hoc";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full my-10 px-8 flex flex-col items-center text-white">
            <p>&copy; {currentYear} Passage2Pro</p>
            <p>Website designed and built by <a className="transition-all duration-300 text-logo hover:text-purple-400" href="https://onlysid.com" target="_blank">Sidney Brown</a>.</p>

        </div>
    );
}

export default Footer;