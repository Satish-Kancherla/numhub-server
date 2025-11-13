// controllers/orderController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const OrderController = {
    // Get all order statuses
    async getOrderStatuses(req, res) {
        try {
            const statuses = await prisma.orderStatus.findMany({
                orderBy: { value: 'asc' }
            });
            res.status(200).json({
                success: true,
                data: statuses.sort((a, b) => parseFloat(a.value) - parseFloat(b.value))
            });
        }
        catch (error) {
            console.error('Error fetching order statuses:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching order statuses'
            });
        }
    },
    // Create new order
    async createOrder(req, res) {
        try {
            const { orderNumber, value } = req.body;
            // Validate input
            if (!orderNumber || !value) {
                return res.status(400).json({
                    success: false,
                    message: 'Order number and status are required'
                });
            }
            // Check if order already exists
            const existingOrder = await prisma.order.findUnique({
                where: { orderNumber },
                include: { status: true }
            });
            if (existingOrder) {
                return res.status(409).json({
                    success: false,
                    message: 'Order number already exists',
                    data: existingOrder
                });
            }
            // Verify status exists
            const status = await prisma.orderStatus.findUnique({
                where: { value: value }
            });
            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status ID'
                });
            }
            // Create new order
            const order = await prisma.order.create({
                data: {
                    orderNumber,
                    statusId: status.id,
                },
                include: {
                    status: true
                }
            });
            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data: order
            });
        }
        catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },
    // Get all orders with their statuses
    async getOrders(req, res) {
        try {
            const query = req.query?.query;
            const orders = await prisma.order.findMany({
                where: { orderNumber: {
                        contains: query || "",
                    } },
                select: {
                    id: true,
                    orderNumber: true,
                    status: true
                },
                orderBy: { createdAt: 'desc' },
                take: 100,
            });
            res.status(200).json({
                success: true,
                data: orders
            });
        }
        catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },
    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const { orderNumber, value } = req.body;
            // Validate input
            if (!orderNumber || !value) {
                return res.status(400).json({
                    success: false,
                    message: 'Order number and status are required'
                });
            }
            // Check if order exists
            const existingOrder = await prisma.order.findUnique({
                where: { id },
                include: { status: true }
            });
            if (!existingOrder) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }
            // Check if order number is being changed to one that already exists (excluding current order)
            if (orderNumber !== existingOrder.orderNumber) {
                const duplicateOrder = await prisma.order.findUnique({
                    where: { orderNumber },
                });
                if (duplicateOrder) {
                    return res.status(409).json({
                        success: false,
                        message: 'Order number already exists'
                    });
                }
            }
            // Verify status exists
            const status = await prisma.orderStatus.findUnique({
                where: { value: value }
            });
            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status value'
                });
            }
            // Update order
            const updatedOrder = await prisma.order.update({
                where: { id },
                data: {
                    orderNumber,
                    statusId: status.id,
                },
                include: {
                    status: true
                }
            });
            res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                data: updatedOrder
            });
        }
        catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },
};
//# sourceMappingURL=orderController.js.map