import client from '../db/db';
import { Order } from '../models/models';

export const createOrder = async (newOrder: Order): Promise<{ orderId: number }> => {
  const { restaurantId, orderItems } = newOrder;

  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      'INSERT INTO orders (restaurant_id) VALUES ($1) RETURNING id',
      [restaurantId]
    );
    const orderId = orderResult.rows[0].id;

    for (const item of orderItems) {
      await client.query(
        'INSERT INTO order_items (order_id, dish_id, amount) VALUES ($1, $2, $3)',
        [orderId, item.dishId, item.amount]
      );
    }

    await client.query('COMMIT');

    return { orderId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw new Error(`Error creating order: ${error}`);
  }
};
