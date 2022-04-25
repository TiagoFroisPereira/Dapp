import contract from "@truffle/contract";

export const loadContract = async (name) => {
    var res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();

    return  contract(Artifact);
}