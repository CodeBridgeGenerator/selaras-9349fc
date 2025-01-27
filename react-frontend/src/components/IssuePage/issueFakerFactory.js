
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
category: faker.lorem.sentence(1),
issueName: faker.lorem.sentence(1),
priorityStatus: faker.lorem.sentence(1),
issueOwner: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
