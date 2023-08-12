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

import * as images from "../assets/images";

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
        price: "£120 (£20 per session)",
        image: images.img00017,
        source_code_link: "https://github.com/",
    },
    {
        name: "One to One Sessions",
        description:
            "Training strictly customised to developing the attributes the individual needs and wants to work on. EG Speed, Technique, Strength, Agility, Finishing etc. One to one sessions are also run as 6 week courses with the option of 60 or 30 min sessions.",
        price: "£480 (£80 per session)",
        image: images.img00019,
        source_code_link: "https://github.com/",
    },
    {
        name: "Holiday Camps",
        description:
            "All day camps run during the school holidays. These camps are designed to be fun filled whilst improving and developing all that attend. All members of staff have been fully CRB checked and are FA qualified coaches.",
        price: "Coming soon...",
        image: images.footballacademy,
        source_code_link: "https://github.com/",
    },
    {
        name: "Finishing School",
        description:
            "This specialised course concentrates on shooting. Open to players of all positions but naturally for the more attacking players EG Strikers, Forwards, Wingers, Attacking Midfielders. The art of scoring goals can be created in many forms and situations. Having the correct techniques, being ruthless but relaxed at the same time is invaluable. ",
        price: "Coming soon...",
        image: images.img00003,
        source_code_link: "https://github.com/",
    },
];

const leostats = {
    image: leo,
}

export { services, technologies, timelineEvents, testimonials, projects, leostats };