import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import logo from "../Budgetlogo.svg"

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "transactions"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddTransaction = async (transaction) => {
    const withTimestamp = {
      ...transaction,
      createdAt: serverTimestamp(),
    };

    if (user) {
      await addDoc(
        collection(db, "users", user.uid, "transactions"),
        withTimestamp
      );
    } else {
      setTransactions([withTimestamp, ...transactions]);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!user || !id) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "transactions", id));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="min-vh-100 py-5 px-3" style={{ background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold text-primary display-5 d-flex align-items-center">
            <img src={logo} alt="BudgetWisely Logo" style={{ width: "220px", height: "auto" }}/>
            </h1>
            <p className="text-muted mb-0 fs-6">Welcome, {user?.email || "Guest"}</p>
          </div>
          <button
            className="btn btn-danger rounded-pill px-4 py-2 fw-semibold shadow-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 text-center mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-lg rounded-4 h-100 bg-gradient" style={{ background: "#fffde7" }}>
              <div className="card-body">
                <h6 className="text-secondary">💰 Current Balance</h6>
                <h3 className="fw-bold text-dark display-6">${balance.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-lg rounded-4 h-100" style={{ background: "#e8f5e9" }}>
              <div className="card-body">
                <h6 className="text-success">📈 Total Income</h6>
                <h3 className="fw-bold text-success display-6">${income.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-lg rounded-4 h-100" style={{ background: "#ffebee" }}>
              <div className="card-body">
                <h6 className="text-danger">📉 Total Expenses</h6>
                <h3 className="fw-bold text-danger display-6">${expenses.toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Add Transaction */}
        <div className="card mb-4 shadow-sm border-0 rounded-4">
          <div className="card-header bg-white border-bottom-0 fw-semibold fs-5">
            ➕ Add New Transaction
          </div>
          <div className="card-body">
            <AddTransaction onAdd={handleAddTransaction} />
          </div>
        </div>

        {/* Transaction List */}
        <div className="card shadow-sm border-0 rounded-4 mb-5">
          <div className="card-header bg-white border-bottom-0 fw-semibold fs-5">
            📋 Transaction History
          </div>
          <div className="card-body">
            {transactions.length === 0 ? (
              <p className="text-muted text-center py-3">
                No transactions yet. Start adding one above!
              </p>
            ) : (
              <TransactionList
                transactions={transactions}
                onDelete={handleDeleteTransaction}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
