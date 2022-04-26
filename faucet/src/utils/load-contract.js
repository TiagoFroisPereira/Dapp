import contract from "@truffle/contract";

export const loadContract = async (name, provider) => {
    var res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();
    
    const _contract = contract(Artifact);
    _contract.setProvider(provider);

    let deployedContract = null;
    try {
        deployedContract = await _contract.deployed();
    } catch {
        console.error("The contract doens't exist in the selected network");
    }

    return  deployedContract;
}