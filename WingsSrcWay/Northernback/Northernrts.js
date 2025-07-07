import NorthernBackground from "./NorthernBackground";
import wingsparts from "../Northernconst/wingsparts";

const NorthernADDRTroute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.NorthernADDRT />}
        />
    )
};

const NorthernBRDroute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.NorthernBRD />}
        />
    )
};

const NorthernHMroute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.NorthernHM />}
            nvgt
        />
    )
};

const NorthernLDRroute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.NorthernLDR />}
        />
    )
};

const NorthernMProute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.NorthernMP />}
            nvgt
        />
    )
};

const NorthernRProute = ({ route }) => {
    const { place } = route.params;

    return (
        <NorthernBackground
            route={<wingsparts.NorthernRP place={place} />}
        />
    )
};

const NorthernRTroute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.NorthernRT />}
            nvgt
        />
    )
};

const NorthernSVDroute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.NorthernSVD />}
            nvgt
        />
    )
};

const Northerninformationroute = () => {
    return (
        <NorthernBackground
            route={<wingsparts.Northerninformation />}
        />
    )
};

const Northernrts = {
    NorthernADDRTroute,
    NorthernBRDroute,
    NorthernHMroute,
    NorthernLDRroute,
    NorthernMProute,
    NorthernRProute,
    NorthernRTroute,
    NorthernSVDroute,
    Northerninformationroute
};

export default Northernrts;