import branding from "../branding";
import logo from "./logo.svg";

// Extract the data URI from the logo
const extract_svg_uri = (dataUri) => {
    const match = dataUri.match(/"(data:image\/svg\+xml[^"]*)"/);
    return match ? match[1] : "";
};

const favicon = extract_svg_uri(logo);

export const initializeApp = () => {
    // Set favicon
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = favicon;
    document.head.appendChild(link);

    // Set title
    const title = document.createElement("title");
    title.textContent = branding.app_title;
    document.head.appendChild(title);

    // Set the viewport height variable
    const setVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    const handleResize = () => {
        setVH();
    };

    window.addEventListener("resize", handleResize);

    // Initial call to set the correct state
    handleResize();
};
