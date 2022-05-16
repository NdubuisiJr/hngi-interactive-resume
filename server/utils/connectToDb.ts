import { connect } from 'mongoose';

const connectDb = async () => {
    try {
        const connectionString: string = process.env.CONNECTION || '';
        await connect(connectionString);
    } catch (error) {
        console.log('db not connected', error);
    }
};

export default connectDb;
