
export const calculateSubscriptionMetrics = (subscriptions) => {
    
    const active_subscriptions = subscriptions.filter(sub => sub.status === "Active");

    let total_monthly_cost = 0;
    let total_yearly_cost = 0;
    let category_spending = {};
    let upcoming_billing_count = 0;
    let most_expensive_subscription = null;

    const today = new Date();
    const next_week = new Date();
    next_week.setDate(today.getDate() + 7);

    active_subscriptions.forEach(sub => {
        
        const cost = parseFloat(sub.cost) || 0;
        const billingFrequency = sub.billingFrequency;

        const monthly_cost = billingFrequency === "Yearly" ? cost / 12 :
            billingFrequency === "Quarterly" ? cost / 3 :
                billingFrequency === "Monthly" ? cost : 0;
        total_monthly_cost += monthly_cost;

        total_yearly_cost += billingFrequency === "Yearly" ? cost :
            billingFrequency === "Quarterly" ? cost * 4 :
                billingFrequency === "Monthly" ? cost * 12 : 0;

        if (!category_spending[sub.category]) {
            category_spending[sub.category] = 0;
        }
        category_spending[sub.category] += cost;

        if (!most_expensive_subscription || cost > most_expensive_subscription.cost) {
            most_expensive_subscription = sub;
        }

        const start_date = new Date(sub.startDate);
        let next_billing_date = new Date(start_date);
        
        while (next_billing_date < today) {
            if (billingFrequency === "Monthly") {
                next_billing_date.setMonth(next_billing_date.getMonth() + 1);
            } else if (billingFrequency === "Yearly") {
                next_billing_date.setFullYear(next_billing_date.getFullYear() + 1);
            } else if (billingFrequency === "Quarterly") {
                next_billing_date.setMonth(next_billing_date.getMonth() + 3);
            } else if (billingFrequency === "One-time") {
                break
            }
        }

        if (next_billing_date >= today && next_billing_date <= next_week) {
            upcoming_billing_count++;
        }

    });

    const average_monthly_spending = active_subscriptions.length > 0 ? total_monthly_cost / active_subscriptions.length : 0;

    let top_spending_category = Object.entries(category_spending).reduce((top, current) => current[1] > top[1] ? current : top, ["", 0])[0] || "None";

    return {
        total_monthly_cost: total_monthly_cost.toFixed(2),
        total_yearly_cost: total_yearly_cost.toFixed(2),
        average_monthly_spending: average_monthly_spending.toFixed(2),
        active_subscriptions: active_subscriptions.length,
        top_spending_category,
        upcoming_billing_count,
        most_expensive_subscription: most_expensive_subscription ? most_expensive_subscription.name : "None"
    };
};

export const formatKey = (key) => {
    return key
        .replace(/([A-Z])/g, " $1") 
        .replace(/^./, (str) => str.toUpperCase()) 
        .replace("Upcoming Billing Dates", "Upcoming Bills (Next 7 Days)")
        .replace("Trial Ending Soon", "Trials Ending Soon")
}

export function getDaysUntilNextCharge(startDate, billingFrequency) {
    const start = new Date(startDate)
    const today = new Date()

    let nextBillingDate = new Date(start)

    if (billingFrequency === "Monthly") {
        
        while (nextBillingDate <= today) {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
        }
    } else if (billingFrequency === "Yearly") {
        
        while (nextBillingDate <= today) {
            nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
        }
    } else if (billingFrequency === "Quarterly") {
        
        while (nextBillingDate <= today) {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 3)
        }
    } else if (billingFrequency === "One-time") {
        
        return "No upcoming charges"
    }

    const diffTime = nextBillingDate - today
    const daysUntilNextCharge = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return daysUntilNextCharge
}

export const subscriptions = [
    {
        id: 1,
        name: "Netflix",
        category: "Entertainment",
        cost: 15.99, 
        currency: "USD",
        billingFrequency: "Monthly", 
        paymentMethod: "Credit Card", 
        startDate: "2022-06-15", 
        renewalType: "Automatic", 
        notes: "Shared with family",
        status: "Active", 
    },
    {
        id: 2,
        name: "Spotify",
        category: "Music",
        cost: 9.99,
        currency: "USD",
        billingFrequency: "Monthly",
        paymentMethod: "PayPal",
        startDate: "2021-11-01",
        renewalType: "Automatic",
        notes: "Student discount applied",
        status: "Active",
    },
    {
        id: 3,
        name: "Amazon Prime",
        category: "Shopping",
        cost: 139.00,
        currency: "USD",
        billingFrequency: "Yearly",
        paymentMethod: "Credit Card",
        startDate: "2019-12-01",
        renewalType: "Automatic",
        notes: "Includes Prime Video",
        status: "Active",
    },
    {
        id: 4,
        name: "Adobe Creative Cloud",
        category: "Software",
        cost: 54.99,
        currency: "USD",
        billingFrequency: "Monthly",
        paymentMethod: "Credit Card",
        startDate: "2023-03-01",
        renewalType: "Manual",
        notes: "Used for video editing and design work",
        status: "Active",
    },
    {
        id: 5,
        name: "Gym Membership",
        category: "Health & Fitness",
        cost: 50.00,
        currency: "USD",
        billingFrequency: "Monthly",
        paymentMethod: "Debit Card",
        startDate: "2020-01-15",
        renewalType: "Automatic",
        notes: "Access to multiple locations",
        status: "Paused",
    },
    {
        id: 6,
        name: "Domain Hosting (GoDaddy)",
        category: "Web Services",
        cost: 12.00,
        currency: "USD",
        billingFrequency: "Yearly",
        paymentMethod: "Credit Card",
        startDate: "2021-08-20",
        renewalType: "Automatic",
        notes: "Used for personal blog",
        status: "Active",
    },
]

