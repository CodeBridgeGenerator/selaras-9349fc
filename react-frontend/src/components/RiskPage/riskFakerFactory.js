
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
owner: faker.lorem.sentence(""),
type: faker.lorem.sentence(""),
category: faker.lorem.sentence(""),
mitigation: faker.lorem.sentence(""),
probability: faker.lorem.sentence(""),
impact: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
