const strategies = {
    checkString: function (value) {
        return value.trim() !== '';
    },

}
const Validator = function () {
    this.cache = [];

    // add su kien
    this.add = function (value, method) {
        this.cache.push(function () {
            return strategies[method](value);
        });
    };

    // check
    this.check = function () {
        for (let i = 0; i < this.cache.length; i++) {
            let valiFn = this.cache[i];
            var data = valiFn(); // check tai day
            if (!data) {
                return false;
            }
        }
        return true;
    };
}
export default Validator