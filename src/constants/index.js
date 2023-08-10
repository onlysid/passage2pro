import {
    southend,
    brentford,
    oxford,
    reading,
    rushden,
    stockport,
    placeholder,
    star,
    leo,
} from "../assets";

const services = [
    {
        title: "Technical",
        icon: star,
        text: "To improve a players technical ability in various areas, from ball control/manipulation, passing, dribbling, turns, touch and more. "
    },
    {
        title: "Physical",
        icon: star,
        text: "To work on a players physical attributes including speed, strength, stamina, agility, quick feet and balance."
    },
    {
        title: "Social",
        icon: star,
        text: "To ensure all players are happy from the moment they walk in to a P2P session to the moment they walk out. Feeling comfortable in the environment they are training in, so they can happily and freely communicate and express themselves."
    },
    {
        title: "Psychological",
        icon: star,
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

const timelineEvents = [
    {
        title: "Step 1",
        subtitle: "Introduction",
        icon: star,
        date: "Week 1",
        points: [
            "Into the first training session we will be laying down the foundations of what we will be working on both technically & physically, ensuring all the players are happy and comfortable in the environment.",
        ],
    },
    {
        title: "Step 2",
        subtitle: "Development",
        icon: star,
        date: "Weeks 2-4",
        points: [
            "Continuing work on the technical & physical aspects of the game, ensuring players can see their improvements in various areas.",
        ],
    },
    {
        title: "Step 3",
        subtitle: "Maximising Potential",
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
    {
        name: "Finishing School",
        description:
            "This 6 week course focussing on attacking players in specifically focusses on shooting (Finishing). Different game like scenarios, types of finishing and the best techniques to use.",
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

export { services, technologies, timelineEvents, testimonials, projects, leostats };