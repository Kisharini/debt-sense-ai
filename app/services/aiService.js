import axios from "axios";

const API_URL = "http://localhost:8000/risk-score";

export const getDebtRisk = async (income, spending, bnpl_count, late_payments) => {
    try {
        const response = await axios.post(API_URL, {
            income: income,
            spending: spending,
            bnpl_count: bnpl_count,
            late_payments: late_payments
        });

        return response.data;
    } catch (error){
        console.error("Error fetching risk score: ", error);
    }
}

export const classifySpending = async (description, amount) => {

    const response = await axios.post(
        "http://localhost:8000/classify-spending",
        {
            description,
            amount
        }
    );

    return response.data
}
