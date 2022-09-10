const namesRaw = [
    "Indus Valley Civilisation",
    "Ramayana",
    "Mahabharata",
    "Gautama Buddha",
    "Mahajanapadas",
    "Magadha",
    "Chanakya",
    "Maurya Empire",
    "Kanishka",
    "Gupta Empire",
    "Rajaraja I",
    "Delhi Sultanate",
    "Ahom kingdom",
    "Vijayanagara Empire",
    "Sikhism",
    "Mughal Empire",
    "Maharana Pratap",
    "Shivaji",
    "Ranjit Singh",
    "Colonial India",
    "Bengali Renaissance",
    "Indian independence movement",
    "Independence Day (India)",
];

// Making all the names URL ready
const names = namesRaw.map(name => {
    return name.replace(/\s/g, "%20")
});

module.exports.names = names;
module.exports.namesRaw = namesRaw;