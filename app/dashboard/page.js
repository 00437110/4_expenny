'use client'

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubscriptionSummary";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function DashboardPage() {

  const isAuthenticated = true

  const [isAddEntry, setIsAddEntry] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Services',
    cost: '',
    currency: 'USD',
    billingFrequency: 'Monthly',
    nextBillingData: '',
    paymentMethod: 'Credit Card',
    startDate: '',
    renewalType: '',
    notes: '',
    status: 'Active'
  })



  function handleChangeInput(e) {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value

    } // we will create a new temporary object as form data is immutable

    setFormData(newData)
  }

  const { handleDeleteSubscription, userData } = useAuth()

  function handleEditSubscription(index) {
    const data = userData.subscriptions.find((val,valIndex)=>{
      return valIndex === index
    })

    setFormData(data)

    handleDeleteSubscription(index)

    setIsAddEntry(true)
  }

  function handleToggleInput() {
    setIsAddEntry(!isAddEntry)
  }

  if (!isAuthenticated) {
    return (
      <Login />
    )
  }

  return (

    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay handleShowInput={isAddEntry ? () => { } : handleToggleInput} />
      {isAddEntry && (<SubscriptionForm onSubmit={() => { }} closeInput={handleToggleInput}
        formData={formData} handleChangeInput={handleChangeInput} />)}
    </>

  );
}
