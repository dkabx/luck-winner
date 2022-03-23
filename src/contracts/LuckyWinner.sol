pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <0.6.0;

contract LuckyWinner {
    mapping(address => User) public enrolledUsers;
    mapping(address => uint256) public balanceOf;
    User[] public users;
    uint256 public totalEnrolleFees = 0;
    uint256 totalUsers;
    uint256 public enrollFee = 1 ether;
    // address adminAddress;
    address payable public winnerAddress;

    // constructor() public {
    //     adminAddress = msg.sender;
    // }

    struct User {
        address payable userAddress;
        bool enrolled;
        string name;
        string email;
        string phone;
    }

    function enrollUser(User memory user)
        public
        payable
        returns (User[] memory)
    {
        // TODO put condition to check if already enrolled
        require(msg.value == enrollFee);
        totalEnrolleFees += enrollFee;
        users.push(
            User({
                userAddress: msg.sender,
                name: user.name,
                email: user.email,
                phone: user.phone,
                enrolled: true
            })
        );
        // balanceOf[msg.sender] += enrollFee;
        enrolledUsers[msg.sender] = User({
                userAddress: msg.sender,
                name: user.name,
                email: user.email,
                phone: user.phone,
                enrolled: true
            });
        return users;
    }

    //    function random() private view returns (uint256) {
    //                 return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, users)));

    //             // return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));

    //     }

    function getEnrolledData()
        public
        returns (
            User[] memory,
            uint256,
            uint256
        )
    {
        return (users, totalEnrolleFees, totalUsers);
    }

    function announceRandomWinner()
        public
        returns (
            address,
            uint256,
            uint256
        )
    {
        uint256 index = 0;
        // uint256 index = random() % users.length;
        winnerAddress = users[index].userAddress;
        uint256 contractBalance = address(this).balance;

        address payable receiver = winnerAddress;

        receiver.transfer(contractBalance);
        // address(winnerAddress).transfer(address(this).balance);
        // User memory winner = users[randomNumber - 1];
        // address winnerAddress = winner.userAddress;
        totalEnrolleFees = 0;
        return (receiver, totalEnrolleFees, contractBalance);
    }
}
