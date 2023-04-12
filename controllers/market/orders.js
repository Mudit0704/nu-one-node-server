export default [
  {
    "user_id": 1,
    "orders": [
      {
        "_id": 1,
        "date": "2021-04-01",
        "status": "Pending",
        "totalValue": 5,
        "address": "1111 1st St",
        "paymentMethod": "Cash",
        "items": [
          {
            "id": 1,
            "name": "Item 1",
            "price": 1.00,
            "quantity": 1
          },
          {
            "id": 2,
            "name": "Item 2",
            "price": 2.00,
            "quantity": 2
          }
        ]
      },
      {
        "_id": 2,
        "date": "2021-04-02",
        "status": "Pending",
        "totalValue": 25,
        "address": "1111 1st St",
        "paymentMethod": "Cash",
        "items": [
          {
            "id": 3,
            "name": "Item 3",
            "price": 3.00,
            "quantity": 3
          },
          {
            "id": 4,
            "name": "Item 4",
            "price": 4.00,
            "quantity": 4
          }
        ]
      }
      ]
  }
]