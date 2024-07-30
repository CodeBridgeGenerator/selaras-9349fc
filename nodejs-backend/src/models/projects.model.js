
    module.exports = function (app) {
        const modelName = 'projects';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            strategic: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
sector: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
codePPI: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
projectType: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
stanco: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
categoryProject: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
ppiExplaination: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
startDate: { type: Date, required: false },
endDate: { type: Date, required: false },
ppiOwner: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
contractorPPI: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
financialSource: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
ppiStatus: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
ketuaTerasVal: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
ketuaBidangVal: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
pegawaiPenguasaVal: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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