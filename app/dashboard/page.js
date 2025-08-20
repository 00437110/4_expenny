'use client'

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubscriptionSummary";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function DashboardPage() {



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

  const { handleDeleteSubscription, userData, currentUser } = useAuth()
  //const isAuthenticated = true
  const isAuthenticated = !!currentUser

  console.log(currentUser)

  function handleChangeInput(e) {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value

    } // we will create a new temporary object as form data is immutable

    setFormData(newData)
  }


  function handleEditSubscription(index) {
    const data = userData.subscriptions.find((val, valIndex) => {
      return valIndex === index
    }) //we find the entry we want using its index in the userData. Subscriptions, matching the index

    setFormData(data) // we se that data of the entry in the formData

    handleDeleteSubscription(index)//we then delete the entry from the subscriptions of the user

    setIsAddEntry(true) //then we have correctly set the entry in order to show the form to modify
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
      <SubscriptionsDisplay handleEditSubscription={handleEditSubscription} handleShowInput={isAddEntry ? () => { } : handleToggleInput} />
      {isAddEntry && (<SubscriptionForm onSubmit={() => { }} closeInput={handleToggleInput}
        formData={formData} handleChangeInput={handleChangeInput} />)}
    </>

  );
}
