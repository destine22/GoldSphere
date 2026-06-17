import { Product, products } from './products';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'banned';
  avatar: string;
  country: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  country: string;
  zip: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  revenueByMonth: { month: string; revenue: number }[];
  topProducts: { name: string; unitsSold: number }[];
  recentOrders: Order[];
  recentUsers: AdminUser[];
}

export interface NotificationsSettings {
  newOrder: boolean;
  lowStock: boolean;
  newUser: boolean;
  orderUpdate: boolean;
  weeklyReport: boolean;
}

export interface SecuritySettings {
  twoFactor: boolean;
  sessionTimeout: string;
}

export interface Settings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  notifications: NotificationsSettings;
  security: SecuritySettings;
}

export const initialSettings: Settings = {
  storeName: 'GoldSphere',
  storeEmail: 'admin@goldsphere.com',
  storePhone: '+31 20 000 0000',
  storeAddress: '123 Main Street, Amsterdam',
  currency: 'NGN',
  notifications: {
    newOrder: true,
    lowStock: true,
    newUser: false,
    orderUpdate: true,
    weeklyReport: false,
  },
  security: {
    twoFactor: false,
    sessionTimeout: '30',
  },
};

// Mock Users
export const adminUsers: AdminUser[] = [
  {
    id: 'u1',
    name: 'Adewale Johnson',
    email: 'adewale.j@goldsphere.com',
    role: 'admin',
    joinDate: '2024-01-15',
    totalOrders: 0,
    totalSpent: 0,
    status: 'active',
    avatar: 'AJ',
    country: 'Nigeria'
  },
  {
    id: 'u2',
    name: 'Chiamaka Okafor',
    email: 'chiamaka.o@goldsphere.com',
    role: 'admin',
    joinDate: '2024-03-22',
    totalOrders: 0,
    totalSpent: 0,
    status: 'active',
    avatar: 'CO',
    country: 'Netherlands'
  },
  {
    id: 'u3',
    name: 'Emma de Vries',
    email: 'emma.devries@example.com',
    role: 'customer',
    joinDate: '2024-05-10',
    totalOrders: 12,
    totalSpent: 320000,
    status: 'active',
    avatar: 'EDV',
    country: 'Netherlands'
  },
  {
    id: 'u4',
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    role: 'customer',
    joinDate: '2024-07-18',
    totalOrders: 8,
    totalSpent: 250000,
    status: 'active',
    avatar: 'JW',
    country: 'UK'
  },
  {
    id: 'u5',
    name: 'Hans Müller',
    email: 'h.mueller@example.com',
    role: 'customer',
    joinDate: '2024-09-05',
    totalOrders: 24,
    totalSpent: 600000,
    status: 'active',
    avatar: 'HM',
    country: 'Germany'
  },
  {
    id: 'u6',
    name: 'Marie Dubois',
    email: 'm.dubois@example.com',
    role: 'customer',
    joinDate: '2024-11-20',
    totalOrders: 5,
    totalSpent: 140000,
    status: 'active',
    avatar: 'MD',
    country: 'France'
  },
  {
    id: 'u7',
    name: 'Jan Van der Meer',
    email: 'j.vandermeer@example.com',
    role: 'customer',
    joinDate: '2025-01-08',
    totalOrders: 15,
    totalSpent: 380000,
    status: 'active',
    avatar: 'JVM',
    country: 'Belgium'
  },
  {
    id: 'u8',
    name: 'Lisa Brown',
    email: 'l.brown@example.com',
    role: 'customer',
    joinDate: '2025-02-14',
    totalOrders: 3,
    totalSpent: 80000,
    status: 'active',
    avatar: 'LB',
    country: 'UK'
  },
  {
    id: 'u9',
    name: 'Andreas Schmidt',
    email: 'a.schmidt@example.com',
    role: 'customer',
    joinDate: '2025-03-30',
    totalOrders: 7,
    totalSpent: 220000,
    status: 'banned',
    avatar: 'AS',
    country: 'Germany'
  },
  {
    id: 'u10',
    name: 'Sophie Martin',
    email: 'sophie.m@example.com',
    role: 'customer',
    joinDate: '2025-04-22',
    totalOrders: 11,
    totalSpent: 300000,
    status: 'active',
    avatar: 'SM',
    country: 'France'
  },
  {
    id: 'u11',
    name: 'Dirk Janssen',
    email: 'd.janssen@example.com',
    role: 'customer',
    joinDate: '2025-05-15',
    totalOrders: 6,
    totalSpent: 170000,
    status: 'active',
    avatar: 'DJ',
    country: 'Netherlands'
  },
  {
    id: 'u12',
    name: 'Tom Jackson',
    email: 'tom.j@example.com',
    role: 'customer',
    joinDate: '2025-06-02',
    totalOrders: 2,
    totalSpent: 60000,
    status: 'active',
    avatar: 'TJ',
    country: 'UK'
  },
  {
    id: 'u13',
    name: 'Anna Klein',
    email: 'anna.k@example.com',
    role: 'customer',
    joinDate: '2025-06-10',
    totalOrders: 18,
    totalSpent: 520000,
    status: 'active',
    avatar: 'AK',
    country: 'Germany'
  },
  {
    id: 'u14',
    name: 'Pierre Laurent',
    email: 'p.laurent@example.com',
    role: 'customer',
    joinDate: '2025-06-12',
    totalOrders: 1,
    totalSpent: 35000,
    status: 'active',
    avatar: 'PL',
    country: 'Belgium'
  },
  {
    id: 'u15',
    name: 'Nkechi Okafor',
    email: 'nkechi.o@example.com',
    role: 'customer',
    joinDate: '2025-06-14',
    totalOrders: 4,
    totalSpent: 120000,
    status: 'active',
    avatar: 'NO',
    country: 'Netherlands'
  }
];

// Mock Orders
export const adminOrders: Order[] = [
  {
    id: 'o1',
    orderNumber: 'GS-2025-001',
    customerId: 'u3',
    customerName: 'Emma de Vries',
    customerEmail: 'emma.devries@example.com',
    items: [
      { name: products[0].name, quantity: 2, price: products[0].price },
      { name: products[4].name, quantity: 1, price: products[4].price }
    ],
    status: 'delivered',
    total: 2 * products[0].price + products[4].price,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-15',
    shippingAddress: {
      street: 'Herengracht 123',
      city: 'Amsterdam',
      country: 'Netherlands',
      zip: '1015 BH'
    },
    paymentMethod: 'Credit Card',
    notes: 'Please leave at front desk'
  },
  {
    id: 'o2',
    orderNumber: 'GS-2025-002',
    customerId: 'u5',
    customerName: 'Hans Müller',
    customerEmail: 'h.mueller@example.com',
    items: [
      { name: products[2].name, quantity: 1, price: products[2].price },
      { name: products[6].name, quantity: 2, price: products[6].price }
    ],
    status: 'shipped',
    total: products[2].price + 2 * products[6].price,
    createdAt: '2025-02-15',
    updatedAt: '2025-02-18',
    shippingAddress: {
      street: 'Bahnhofsplatz 5',
      city: 'Berlin',
      country: 'Germany',
      zip: '10178'
    },
    paymentMethod: 'PayPal',
    notes: ''
  },
  {
    id: 'o3',
    orderNumber: 'GS-2025-003',
    customerId: 'u7',
    customerName: 'Jan Van der Meer',
    customerEmail: 'j.vandermeer@example.com',
    items: [
      { name: products[9].name, quantity: 3, price: products[9].price },
      { name: products[12].name, quantity: 1, price: products[12].price }
    ],
    status: 'processing',
    total: 3 * products[9].price + products[12].price,
    createdAt: '2025-03-05',
    updatedAt: '2025-03-06',
    shippingAddress: {
      street: 'Rue de la Loi 42',
      city: 'Brussels',
      country: 'Belgium',
      zip: '1000'
    },
    paymentMethod: 'iDEAL',
    notes: ''
  },
  {
    id: 'o4',
    orderNumber: 'GS-2025-004',
    customerId: 'u4',
    customerName: 'James Wilson',
    customerEmail: 'j.wilson@example.com',
    items: [
      { name: products[15].name, quantity: 1, price: products[15].price },
      { name: products[18].name, quantity: 2, price: products[18].price }
    ],
    status: 'pending',
    total: products[15].price + 2 * products[18].price,
    createdAt: '2025-04-20',
    updatedAt: '2025-04-20',
    shippingAddress: {
      street: 'Oxford Street 789',
      city: 'London',
      country: 'UK',
      zip: 'W1C 1AP'
    },
    paymentMethod: 'Klarna',
    notes: ''
  },
  {
    id: 'o5',
    orderNumber: 'GS-2025-005',
    customerId: 'u11',
    customerName: 'Dirk Janssen',
    customerEmail: 'd.janssen@example.com',
    items: [
      { name: products[3].name, quantity: 1, price: products[3].price }
    ],
    status: 'cancelled',
    total: products[3].price,
    createdAt: '2025-05-02',
    updatedAt: '2025-05-03',
    shippingAddress: {
      street: 'Damrak 200',
      city: 'Amsterdam',
      country: 'Netherlands',
      zip: '1012 GP'
    },
    paymentMethod: 'Credit Card',
    notes: 'Customer changed their mind'
  },
  {
    id: 'o6',
    orderNumber: 'GS-2025-006',
    customerId: 'u13',
    customerName: 'Anna Klein',
    customerEmail: 'anna.k@example.com',
    items: [
      { name: products[0].name, quantity: 1, price: products[0].price },
      { name: products[1].name, quantity: 1, price: products[1].price },
      { name: products[4].name, quantity: 2, price: products[4].price }
    ],
    status: 'delivered',
    total: products[0].price + products[1].price + 2 * products[4].price,
    createdAt: '2025-05-10',
    updatedAt: '2025-05-14',
    shippingAddress: {
      street: 'Münchner Straße 45',
      city: 'Munich',
      country: 'Germany',
      zip: '80331'
    },
    paymentMethod: 'PayPal',
    notes: ''
  },
  {
    id: 'o7',
    orderNumber: 'GS-2025-007',
    customerId: 'u10',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.m@example.com',
    items: [
      { name: products[7].name, quantity: 3, price: products[7].price }
    ],
    status: 'shipped',
    total: 3 * products[7].price,
    createdAt: '2025-05-25',
    updatedAt: '2025-05-27',
    shippingAddress: {
      street: 'Rue Saint-Honoré 100',
      city: 'Paris',
      country: 'France',
      zip: '75001'
    },
    paymentMethod: 'Bancontact',
    notes: 'Gift wrap please'
  },
  {
    id: 'o8',
    orderNumber: 'GS-2025-008',
    customerId: 'u3',
    customerName: 'Emma de Vries',
    customerEmail: 'emma.devries@example.com',
    items: [
      { name: products[11].name, quantity: 1, price: products[11].price },
      { name: products[14].name, quantity: 1, price: products[14].price }
    ],
    status: 'processing',
    total: products[11].price + products[14].price,
    createdAt: '2025-06-01',
    updatedAt: '2025-06-02',
    shippingAddress: {
      street: 'Prinsengracht 50',
      city: 'Amsterdam',
      country: 'Netherlands',
      zip: '1015 GC'
    },
    paymentMethod: 'iDEAL',
    notes: ''
  },
  {
    id: 'o9',
    orderNumber: 'GS-2025-009',
    customerId: 'u8',
    customerName: 'Lisa Brown',
    customerEmail: 'l.brown@example.com',
    items: [
      { name: products[20].name, quantity: 2, price: products[20].price }
    ],
    status: 'pending',
    total: 2 * products[20].price,
    createdAt: '2025-06-05',
    updatedAt: '2025-06-05',
    shippingAddress: {
      street: 'Regent Street 22',
      city: 'London',
      country: 'UK',
      zip: 'W1B 5AX'
    },
    paymentMethod: 'Credit Card',
    notes: ''
  },
  {
    id: 'o10',
    orderNumber: 'GS-2025-010',
    customerId: 'u6',
    customerName: 'Marie Dubois',
    customerEmail: 'm.dubois@example.com',
    items: [
      { name: products[5].name, quantity: 1, price: products[5].price },
      { name: products[8].name, quantity: 1, price: products[8].price }
    ],
    status: 'delivered',
    total: products[5].price + products[8].price,
    createdAt: '2025-04-08',
    updatedAt: '2025-04-12',
    shippingAddress: {
      street: 'Avenue des Champs-Élysées 15',
      city: 'Paris',
      country: 'France',
      zip: '75008'
    },
    paymentMethod: 'PayPal',
    notes: ''
  },
  {
    id: 'o11',
    orderNumber: 'GS-2025-011',
    customerId: 'u5',
    customerName: 'Hans Müller',
    customerEmail: 'h.mueller@example.com',
    items: [
      { name: products[17].name, quantity: 1, price: products[17].price },
      { name: products[19].name, quantity: 1, price: products[19].price }
    ],
    status: 'processing',
    total: products[17].price + products[19].price,
    createdAt: '2025-06-08',
    updatedAt: '2025-06-09',
    shippingAddress: {
      street: 'Kurfürstendamm 100',
      city: 'Berlin',
      country: 'Germany',
      zip: '10707'
    },
    paymentMethod: 'Klarna',
    notes: ''
  },
  {
    id: 'o12',
    orderNumber: 'GS-2025-012',
    customerId: 'u15',
    customerName: 'Nkechi Okafor',
    customerEmail: 'nkechi.o@example.com',
    items: [
      { name: products[22].name, quantity: 3, price: products[22].price }
    ],
    status: 'pending',
    total: 3 * products[22].price,
    createdAt: '2025-06-10',
    updatedAt: '2025-06-10',
    shippingAddress: {
      street: 'Overtoom 300',
      city: 'Amsterdam',
      country: 'Netherlands',
      zip: '1072 LN'
    },
    paymentMethod: 'Credit Card',
    notes: ''
  },
  {
    id: 'o13',
    orderNumber: 'GS-2025-013',
    customerId: 'u12',
    customerName: 'Tom Jackson',
    customerEmail: 'tom.j@example.com',
    items: [
      { name: products[10].name, quantity: 1, price: products[10].price }
    ],
    status: 'shipped',
    total: products[10].price,
    createdAt: '2025-06-03',
    updatedAt: '2025-06-05',
    shippingAddress: {
      street: 'King Street 56',
      city: 'Manchester',
      country: 'UK',
      zip: 'M2 6LT'
    },
    paymentMethod: 'PayPal',
    notes: ''
  },
  {
    id: 'o14',
    orderNumber: 'GS-2025-014',
    customerId: 'u7',
    customerName: 'Jan Van der Meer',
    customerEmail: 'j.vandermeer@example.com',
    items: [
      { name: products[13].name, quantity: 2, price: products[13].price },
      { name: products[16].name, quantity: 1, price: products[16].price }
    ],
    status: 'delivered',
    total: 2 * products[13].price + products[16].price,
    createdAt: '2025-05-20',
    updatedAt: '2025-05-24',
    shippingAddress: {
      street: 'Rue Royale 80',
      city: 'Brussels',
      country: 'Belgium',
      zip: '1000'
    },
    paymentMethod: 'Bancontact',
    notes: ''
  },
  {
    id: 'o15',
    orderNumber: 'GS-2025-015',
    customerId: 'u8',
    customerName: 'Lisa Brown',
    customerEmail: 'l.brown@example.com',
    items: [
      { name: products[21].name, quantity: 1, price: products[21].price }
    ],
    status: 'pending',
    total: products[21].price,
    createdAt: '2025-06-12',
    updatedAt: '2025-06-12',
    shippingAddress: {
      street: 'Bond Street 25',
      city: 'London',
      country: 'UK',
      zip: 'W1S 1SR'
    },
    paymentMethod: 'Credit Card',
    notes: ''
  },
  {
    id: 'o16',
    orderNumber: 'GS-2025-016',
    customerId: 'u14',
    customerName: 'Pierre Laurent',
    customerEmail: 'p.laurent@example.com',
    items: [
      { name: products[0].name, quantity: 1, price: products[0].price },
      { name: products[2].name, quantity: 1, price: products[2].price }
    ],
    status: 'shipped',
    total: products[0].price + products[2].price,
    createdAt: '2025-06-11',
    updatedAt: '2025-06-13',
    shippingAddress: {
      street: 'Rue Neuve 10',
      city: 'Brussels',
      country: 'Belgium',
      zip: '1000'
    },
    paymentMethod: 'Bancontact',
    notes: ''
  },
  {
    id: 'o17',
    orderNumber: 'GS-2025-017',
    customerId: 'u10',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.m@example.com',
    items: [
      { name: products[4].name, quantity: 2, price: products[4].price }
    ],
    status: 'cancelled',
    total: 2 * products[4].price,
    createdAt: '2025-06-01',
    updatedAt: '2025-06-02',
    shippingAddress: {
      street: 'Place de la Concorde 1',
      city: 'Paris',
      country: 'France',
      zip: '75008'
    },
    paymentMethod: 'PayPal',
    notes: 'Out of stock'
  },
  {
    id: 'o18',
    orderNumber: 'GS-2025-018',
    customerId: 'u13',
    customerName: 'Anna Klein',
    customerEmail: 'anna.k@example.com',
    items: [
      { name: products[6].name, quantity: 1, price: products[6].price },
      { name: products[9].name, quantity: 1, price: products[9].price }
    ],
    status: 'processing',
    total: products[6].price + products[9].price,
    createdAt: '2025-06-13',
    updatedAt: '2025-06-14',
    shippingAddress: {
      street: 'Reeperbahn 50',
      city: 'Hamburg',
      country: 'Germany',
      zip: '20359'
    },
    paymentMethod: 'Klarna',
    notes: ''
  },
  {
    id: 'o19',
    orderNumber: 'GS-2025-019',
    customerId: 'u4',
    customerName: 'James Wilson',
    customerEmail: 'j.wilson@example.com',
    items: [
      { name: products[12].name, quantity: 3, price: products[12].price }
    ],
    status: 'pending',
    total: 3 * products[12].price,
    createdAt: '2025-06-14',
    updatedAt: '2025-06-14',
    shippingAddress: {
      street: 'Camden High Street 12',
      city: 'London',
      country: 'UK',
      zip: 'NW1 0JH'
    },
    paymentMethod: 'Credit Card',
    notes: ''
  },
  {
    id: 'o20',
    orderNumber: 'GS-2025-020',
    customerId: 'u6',
    customerName: 'Marie Dubois',
    customerEmail: 'm.dubois@example.com',
    items: [
      { name: products[20].name, quantity: 1, price: products[20].price },
      { name: products[22].name, quantity: 2, price: products[22].price }
    ],
    status: 'shipped',
    total: products[20].price + 2 * products[22].price,
    createdAt: '2025-06-13',
    updatedAt: '2025-06-14',
    shippingAddress: {
      street: 'Rue de Rivoli 200',
      city: 'Paris',
      country: 'France',
      zip: '75001'
    },
    paymentMethod: 'PayPal',
    notes: ''
  }
];

export function getAdminStats(): AdminStats {
  const totalRevenue = adminOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = adminOrders.length;
  const totalUsers = adminUsers.length;
  const totalProducts = products.length;

  const pendingOrders = adminOrders.filter(o => o.status === 'pending').length;
  const processingOrders = adminOrders.filter(o => o.status === 'processing').length;
  const shippedOrders = adminOrders.filter(o => o.status === 'shipped').length;
  const deliveredOrders = adminOrders.filter(o => o.status === 'delivered').length;
  const cancelledOrders = adminOrders.filter(o => o.status === 'cancelled').length;

  const revenueByMonth = [
    { month: 'Jan', revenue: 950000 },
    { month: 'Feb', revenue: 1100000 },
    { month: 'Mar', revenue: 1000000 },
    { month: 'Apr', revenue: 1300000 },
    { month: 'May', revenue: 1250000 },
    { month: 'Jun', revenue: 1500000 }
  ];

  // Calculate top products by units sold
  const productSales = new Map<string, number>();
  adminOrders.forEach(order => {
    order.items.forEach(item => {
      productSales.set(item.name, (productSales.get(item.name) || 0) + item.quantity);
    });
  });

  const topProducts = Array.from(productSales.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, unitsSold]) => ({ name, unitsSold }));

  const recentOrders = [...adminOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentUsers = [...adminUsers]
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, 5);

  return {
    totalRevenue,
    totalOrders,
    totalUsers,
    totalProducts,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    revenueByMonth,
    topProducts,
    recentOrders,
    recentUsers
  };
}
