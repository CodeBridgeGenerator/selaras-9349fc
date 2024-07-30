
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
strategic: faker.lorem.sentence(""),
sector: faker.lorem.sentence(""),
codePPI: faker.lorem.sentence(""),
projectType: faker.lorem.sentence(""),
stanco: faker.lorem.sentence(""),
categoryProject: faker.lorem.sentence(""),
ppiExplaination: faker.lorem.sentence(""),
startDate: faker.lorem.sentence(""),
endDate: faker.lorem.sentence(""),
ppiOwner: faker.lorem.sentence(""),
contractorPPI: faker.lorem.sentence(""),
financialSource: faker.lorem.sentence(""),
ppiStatus: faker.lorem.sentence(""),
ketuaTerasVal: faker.lorem.sentence(""),
ketuaBidangVal: faker.lorem.sentence(""),
pegawaiPenguasaVal: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
