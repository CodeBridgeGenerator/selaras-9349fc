
    module.exports = function (app) {
        const modelName = 'risk';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
owner: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
type: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
category: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
mitigation: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
probability: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
impact: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };