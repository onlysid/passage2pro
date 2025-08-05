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
    video,
} from "../assets";

export const formatWithOrdinal = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'short' });

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${getOrdinal(day)} ${month}`;
};

import * as images from "../assets/images";

const services = [
    {
        title: "Technical",
        icon: star,
        text: "To improve a player's technical ability in various areas, from ball control/manipulation, passing, dribbling, turns, touch and more. "
    },
    {
        title: "Physical",
        icon: star,
        text: "To work on a player's physical attributes including speed, strength, stamina, agility, quick feet and balance."
    },
    {
        title: "Social",
        icon: star,
        text: "To ensure all players are happy from the moment they walk in to a P2P session to the moment they walk out. Feeling comfortable in the environment they are training in, so they can happily and freely communicate and express themselves."
    },
    {
        title: "Psychological",
        icon: star,
        text: "To support each player so that they have a positive mindset towards their training and can recognise their development/progress week on week."
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

const camps = [
//     {
//     id: 'leventhorpe-single',
//     name: 'Leventhorpe One-Day Special',
//     location: 'Leventhorpe School',
//     start: new Date("2025-07-25"),
//     end: new Date("2025-07-25"),
//     priceOverride: 5,
//     fullPrice: 25,
//     description: [
//       "Special One-Day Event on July 25th (Leventhorpe)",
//       "Discounted to just £5 for this day only."
//     ]
//   },
//   {
//     id: 'markhall',
//     name: 'Mark Hall',
//     location: 'Mark Hall Sports Centre',
//     start: new Date("2025-07-28"),
//     end: new Date("2025-08-01"),
//     pricePerDay: 25,
//     fullWeekPricePerDay: 20,
//     description: [
//       "Jul 28th - Aug 1st, 9am-3pm (Mark Hall)",
//       "Early pick up and late drop off available on request."
//     ],
//   },
//   {
//     id: 'leventhorpe',
//     name: 'Leventhorpe',
//     location: 'Leventhorpe School',
//     start: new Date("2025-08-11"),
//     end: new Date("2025-08-15"),
//     pricePerDay: 25,
//     fullWeekPricePerDay: 20,
//     description: [
//       "Aug 11th - Aug 15th, 9am-3pm (Leventhorpe)",
//       "Early pick up and late drop off available on request."
//     ],
//   },
  {
    id: 'leventhorpe2',
    name: 'Leventhorpe',
    location: 'Leventhorpe School',
    start: new Date("2025-08-26"),
    end: new Date("2025-08-29"),
    pricePerDay: 25,
    fullWeekPricePerDay: 20,
    description: [
      "Aug 26th - Aug 29th, 9am-3pm (Leventhorpe)",
      "Early pick up and late drop off available on request."
    ],
  },
];

const projects = [
    {
        name: "One to One Sessions",
        description:
            ["Training strictly customised to developing the attributes that the individual needs and wants to work on. eg Speed, Technique, Strength, Agility, Finishing etc. One to one sessions are also run as 6 week courses with the option of 60 or 30 min sessions.",],
        image: images.img00013,
        type: "image",
        extra: [
            "1hr Sessions: £420 for 6 Weeks (£70/Session)",
            "30min Sessions: £210 for 6 Weeks (£35/Session)"
        ],
    },
    // {
    //     name: "Finishing School",
    //     description:
    //         ["This specialised course concentrates on shooting. Open to players of all positions but naturally for the more attacking players eg. Strikers, Forwards, Wingers and Attacking Midfielders. The art of scoring goals can be created in many forms and situations. Having the correct techniques, being ruthless but relaxed at the same time is invaluable.",],
    //     image: images.img00003,
    //     type: "image",
    //     extra: ["£120 (£20 per session)"],
    // },
    {
        name: "2-1 “Tandem” sessions",
        description:
            [
                "Tandem sessions also known as 2-1 sessions are where two players of a similar ability train together.",
                "This still allows the personal attention each player needs but also allows for creating 1-1 game like scenarios and a healthy  competitiveness which can’t be recreated training as an individual.",
            ],
        image: images.img00027,
        type: "image",
        extra: [
            "1hr Sessions: £270 for 6 Weeks (£45/Session)"
        ],
    },
    {
        name: "Small Group Session: 4-8 Players",
        description:
            ["Small group training allows players to work not only on their individual game but also with others of a similar level. Being in a group naturally makes certain drills and exercises more game realistic and allows further player development.",],
        image: images.img00024,
        type: "image",
        extra: ["£120 (£20 per session)"],
    },
    {
        name: "Holiday Camps",
        description:
            [
                "P2P Holiday camps are primarily  designed to be fun filled where the emphasis is based on ENJOYMENT.",
                "With fun drills, challenges, tournaments, competitions (King of the rings, free style, penalty champs, free kick champs) special guests appearances, trophy presentation with podium awards ceremony and MUCH MUCH more.",
                "P2P aim to make this the best holiday camp, where kids love to walk in and hate to leave.",
            ],
        image: video,
        type: "video",
        extra: [
            "Next camps:", 
            ...camps.map(c => {
                const sameDay = c.start.toDateString() === c.end.toDateString();
                const dateText = sameDay
                    ? `${formatWithOrdinal(c.start)}`
                    : `${formatWithOrdinal(c.start)} – ${formatWithOrdinal(c.end)}`;
                return `${dateText}, 9am–3pm (${c.name})`;
            }),
            "Early pick up late drop off available on request",
        ],
    },
];

const leostats = {
    image: leo,
}

export { services, technologies, timelineEvents, testimonials, projects, leostats, camps};