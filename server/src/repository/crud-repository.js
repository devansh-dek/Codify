
class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        }
        catch (error) {
            throw (error);
        }
    }
    async getById(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        }
        catch (error) {
            throw (error);
        }
    }
    async update(data, id) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        }
        catch (error) {
            throw (error);
        }
    }
    async getAll() {
        try {
            console.log("Data came ");

            const result = await this.model.findAll();
            return result;
        }
        catch (error) {
            throw error;
        }
    }


}
module.exports = CrudRepository;
