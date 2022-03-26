const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma
    .$connect()
    .then(async () => {
        console.log("Prisma connected");
        const allCustomers = await prisma.customer.findMany({
            include: {
                invoices: true,
            },
        });
        console.log(`allCustomers`, allCustomers);
        const allInvoices = await prisma.invoice.findMany({
            include: {
                customer: true,
            },
        });
        console.log(`allInvoices`, allInvoices);
        const foundCustomer = await prisma.customer.findFirst({
            where: {
                invoices: {
                    every: {
                        email: "example@gmail.com",
                    },
                },
            },
            select: {
                id: true,
                invoices: {
                    select: {
                        id: true,
                    },
                },
                _count: {
                    select: {
                        invoices: true,
                    },
                },
            },
        });
        console.log(`foundCustomer`, foundCustomer);
    })
    .catch(console.log);
