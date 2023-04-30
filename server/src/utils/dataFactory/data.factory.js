// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import People from '../../models/People.js';
import Conversation from '../../models/Conversation.js';
import Message from '../../models/Message.js';

const getHashedPassword = async () => {
  const [hashed] = await Promise.all([bcrypt.hash('Arabin1!', 10)]);

  return hashed;
};

const dataFactory = async () => {
  const hashedPassword = await getHashedPassword();

  const peopleData = [];
  for (let i = 0; i < 10; i++) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const email = faker.internet.email(firstname, lastname);
    const password = hashedPassword;
    const role = i % 4 === 0 ? 'admin' : 'user'; // Make the first person an admin
    peopleData.push({
      firstname,
      lastname,
      email,
      password,
      role,
    });
  }

  // Insert the people data into the People model
  People.insertMany(peopleData)
    .then(async (peoples) => {
      console.log(`${peoples.length} people data inserted successfully!`);

      // Generate 10 random conversations
      const conversationData = [];
      for (let i = 0; i < 10; i++) {
        const [creator, participant] = faker.helpers.arrayElements(peoples, 2);

        // Check if a conversation already exists between these two peoples
        const existingConversation = conversationData.filter(
          (conversation) =>
            (conversation.creatorPeopleId === creator._id &&
              conversation.participantPeopleId === participant._id) ||
            (conversation.creatorPeopleId === participant._id &&
              conversation.participantPeopleId === creator._id)
        );

        // If a conversation doesn't already exist, create a new one
        if (!existingConversation.length) {
          conversationData.push({
            creatorPeopleId: creator._id,
            participantPeopleId: participant._id,
          });
        }
      }

      // Insert the conversation data into the Conversation model
      Conversation.insertMany(conversationData)
        .then(async (conversations) => {
          console.log(`${conversations.length} conversation data inserted successfully!`);

          const messageData = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const conversation of conversations) {
            messageData.push({
              text: faker.lorem.sentence(10),
              conversationId: conversation._id,
              senderPeopleId: conversation.creatorPeopleId,
            });
            messageData.push({
              text: faker.lorem.sentence(10),
              conversationId: conversation._id,
              senderPeopleId: conversation.participantPeopleId,
            });
          }

          Message.insertMany(messageData)
            .then(async (messages) => {
              console.log(`${messages.length} message data inserted successfully!`);
              process.exit(0);
            })
            .catch((e) => {
              console.error('Error inserting message data:', e.message);
              process.exit(1);
            });
        })
        .catch((error) => {
          console.error('Error inserting conversation data:', error);
          process.exit(1);
        });
    })
    .catch((error) => {
      console.error('Error inserting people data:', error);
      process.exit(1);
    });
};

export default dataFactory;
