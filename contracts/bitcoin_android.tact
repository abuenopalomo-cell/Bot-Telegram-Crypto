import "@stdlib/deploy";

message Mint {
    amount: Int;
    receiver: Address;
}

contract BitcoinAndroidToken with Deployable {
    totalSupply: Int;
    owner: Address;

    init(owner: Address) {
        self.totalSupply = 21000000 * 100000000; // 21 millones de BTCA
        self.owner = owner;
    }

    receive(msg: Mint) {
        require(sender() == self.owner, "Solo el dueño puede minar/emitir mas monedas");
        self.totalSupply = self.totalSupply + msg.amount;
    }
    
    get fun total_supply(): Int {
        return self.totalSupply;
    }
}
