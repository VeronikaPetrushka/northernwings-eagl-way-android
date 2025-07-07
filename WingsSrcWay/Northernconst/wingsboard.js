import { manEagle, manHi, man, manGood, eagles } from "./wingsassts";

const wingsboard = [
    {
        image: manHi,
        decor: manEagle,
        title: [
            'Hello!',
            'I`m your guide to Canada'
        ],
        text: "My name is Alex. I'll show you the most amazing places in this great land - from mountains to nature reserves. Ready to hit the road?",
        btn: 'Hello! Go!'
    },
    {
        image: man,
        title: [
            'Browse, read, save'
        ],
        text: 'In the app you will find locations with photos, coordinates and descriptions.',
        btn: 'Continue'
    },
    {
        image: manGood,
        decor: eagles,
        title: [
            'Create a route and return to your favorite places'
        ],
        text: 'Save points, share with friends, plan your trip — all in one app. Pack your backpack — I`m waiting for you!',
        btn: 'Start!'
    }
];

export default wingsboard;