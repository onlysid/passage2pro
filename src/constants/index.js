import {
    mobile,
    backend,
    creator,
    web,
    southend,
    braintree,
    brentford,
    harlow,
    oxford,
    reading,
    rushden,
    stalbans,
    stockport,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    placeholder,
    star,
    jobit,
    tripguide,
    threejs,
    leo,
} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Technical",
        icon: web,
        text: "To improve a players technical ability in various areas, from ball control/manipulation, passing, dribbling, turns, touch and more. "
    },
    {
        title: "Physical",
        icon: mobile,
        text: "To work on a players physical attributes including speed, strength, stamina, agility, balance."
    },
    {
        title: "Social",
        icon: backend,
        text: "To ensure a player is happy from when they walk in to when they walk out of each session. Being comfortable in the environment they are training in so they can happily and freely communicate and express themselves."
    },
    {
        title: "Psychological",
        icon: creator,
        text: "To support each player so they have a positive mindset towards their training and can recognise their development/progress week on week."
    },
];

const technologies = [
    {
        name: "brentford",
        icon: brentford,
    },
    {
        name: "oxford",
        icon: oxford,
    },
    {
        name: "reading",
        icon: reading,
    },
    {
        name: "rushden",
        icon: rushden,
    },
    {
        name: "southend",
        icon: southend,
    },
    {
        name: "stockport",
        icon: stockport,
    },
];

const experiences = [
    {
        title: "Step 1",
        company_name: "Introduction",
        icon: star,
        date: "Week 1",
        points: [
            "Into the first training session we will be laying down the foundations of what we will be working on both technically & physically, ensuring all the players are happy and comfortable in the environment.",
        ],
    },
    {
        title: "Step 2",
        company_name: "Development",
        icon: star,
        date: "Weeks 2-4",
        points: [
            "Continuing work on the technical & physical aspects of the game, ensuring players can see their improvements in various areas.",
        ],
    },
    {
        title: "Step 3",
        company_name: "Maximising Potential",
        icon: star,
        date: "Weeks 5-6",
        points: [
            "Having worked with the players for some weeks, recognising their potential as individuals and a collective and working with them to maximise these levels to bring out their best.",
        ],
    },
];

const testimonials = [
    {
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eius molestias. Tempore minima vel illo sequi aliquid praesentium ab repellat soluta expedita cumque, ad perferendis quia ipsa accusamus? Exercitationem, tempora?",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eius molestias. Tempore minima vel illo sequi aliquid praesentium ab repellat soluta expedita cumque, ad perferendis quia ipsa accusamus? Exercitationem, tempora?",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eius molestias. Tempore minima vel illo sequi aliquid praesentium ab repellat soluta expedita cumque, ad perferendis quia ipsa accusamus? Exercitationem, tempora?",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const projects = [
    {
        name: "Small Group Session",
        description:
            "4-8 players. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eius molestias. Tempore minima vel illo sequi aliquid praesentium ab repellat soluta expedita cumque, ad perferendis quia ipsa accusamus? Exercitationem, tempora?",
        tags: [
            // {
            //     name: "react",
            //     color: "blue-text-gradient",
            // },
            // {
            //     name: "mongodb",
            //     color: "green-text-gradient",
            // },
            // {
            //     name: "tailwind",
            //     color: "pink-text-gradient",
            // },
        ],
        price: "£120 (£20 per session)",
        image: placeholder,
        source_code_link: "https://github.com/",
    },
    {
        name: "1-1 Sessions",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eius molestias. Tempore minima vel illo sequi aliquid praesentium ab repellat soluta expedita cumque, ad perferendis quia ipsa accusamus? Exercitationem, tempora?",
        tags: [
            // {
            //     name: "react",
            //     color: "blue-text-gradient",
            // },
            // {
            //     name: "restapi",
            //     color: "green-text-gradient",
            // },
            // {
            //     name: "scss",
            //     color: "pink-text-gradient",
            // },
        ],
        price: "£480 (£80 per session)",
        image: placeholder,
        source_code_link: "https://github.com/",
    },
    {
        name: "Holiday Camps",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eius molestias. Tempore minima vel illo sequi aliquid praesentium ab repellat soluta expedita cumque, ad perferendis quia ipsa accusamus? Exercitationem, tempora?",
        tags: [
            // {
            //     name: "nextjs",
            //     color: "blue-text-gradient",
            // },
            // {
            //     name: "supabase",
            //     color: "green-text-gradient",
            // },
            // {
            //     name: "css",
            //     color: "pink-text-gradient",
            // },
        ],
        price: "Coming soon...",
        image: placeholder,
        source_code_link: "https://github.com/",
    },
];

const leostats = {
    image: leo,
}

export { services, technologies, experiences, testimonials, projects, leostats };