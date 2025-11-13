// scripts/initializeDB.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const ORDER_STATUSES = [
    { id: '1', name: 'ActionRequired', value: '1' },
    { id: '2', name: 'Pending', value: '2' },
    { id: '3', name: 'Authorized', value: '4' },
    { id: '4', name: 'Active', value: '16' },
    { id: '5', name: 'Sending', value: '32' },
    { id: '6', name: 'Conflict', value: '64' },
    { id: '7', name: 'Old', value: '128' },
    { id: '8', name: 'Failed', value: '256' },
    { id: '9', name: 'PartialFailure', value: '512' },
    { id: '10', name: 'Canceled', value: '1024' },
    { id: '11', name: 'CancelPending', value: '2048' },
    { id: '12', name: 'DisconnectPending', value: '4096' },
    { id: '13', name: 'ActivatePending', value: '8192' },
    { id: '14', name: 'PreOrderPending', value: '16384' },
    { id: '15', name: 'ReceivedFoc', value: '32768' },
    { id: '16', name: 'Rejected', value: '65536' },
    { id: '17', name: 'Submitted', value: '131072' },
    { id: '18', name: 'Supplemented', value: '262144' },
    { id: '19', name: 'CSRPending', value: '524288' },
    { id: '20', name: 'CSRRequested', value: '1048576' },
    { id: '21', name: 'CSRModified', value: '2097152' },
    { id: '22', name: 'CSRInvalid', value: '4194304' },
    { id: '23', name: 'CSREscalated', value: '8388608' },
    { id: '24', name: 'CSRReview', value: '16777216' },
    { id: '25', name: 'CSRReceived', value: '33554432' },
    { id: '26', name: 'CSRApproved', value: '67108864' }
];
async function initializeDatabase() {
    try {
        console.log('Initializing order statuses...');
        for (const status of ORDER_STATUSES) {
            await prisma.orderStatus.upsert({
                where: { name: status.name },
                update: { value: status.value },
                create: {
                    id: status.id,
                    name: status.name,
                    value: status.value
                }
            });
        }
        console.log('Order statuses initialized successfully!');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
initializeDatabase();
//# sourceMappingURL=initializeDB.js.map