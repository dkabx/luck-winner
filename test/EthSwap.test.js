const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


require("chai")
.use("chai-as-promised")
.should()

contract("EthSwap", (accounts) => {
    describe("EthSwap deployment", async () => {
        it("contract has name", async() => {
            ethSwap = new EthSwap()
            const name = ethSwap.name
            assert.equal(name, 'EthSwap Instant Exchange')
        })
    })
})