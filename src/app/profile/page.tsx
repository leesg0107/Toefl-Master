"use client";

import Link from "next/link";
import { ArrowLeft, User, Crown, Mail, Calendar, CreditCard, ExternalLink, LogOut, RefreshCw, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SubscriptionDetails {
  subscription: {
    status: string;
    statusFormatted: string;
    renewsAt: string | null;
    endsAt: string | null;
    cardBrand: string | null;
    cardLastFour: string | null;
  };
  urls: {
    updatePaymentMethod: string | null;
    customerPortal: string | null;
  };
}

export default function ProfilePage() {
  const { user, profile, isPremium, loading, signOut, session, refreshProfile } = useAuth();
  const router = useRouter();
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth?redirect=/profile");
    }
  }, [loading, user, router]);

  // Fetch subscription details when user is premium
  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      if (!isPremium || !session?.access_token) return;

      setLoadingDetails(true);
      try {
        const response = await fetch("/api/lemonsqueezy/customer-portal", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubscriptionDetails(data);
        }
      } catch (error) {
        console.error("Failed to fetch subscription details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchSubscriptionDetails();
  }, [isPremium, session?.access_token]);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleRefreshSubscription = async () => {
    setRefreshing(true);
    await refreshProfile();
    // Re-fetch subscription details
    if (session?.access_token) {
      try {
        const response = await fetch("/api/lemonsqueezy/customer-portal", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${session.access_token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSubscriptionDetails(data);
        }
      } catch (error) {
        console.error("Failed to refresh subscription details:", error);
      }
    }
    setRefreshing(false);
  };

  const handleUpdatePaymentMethod = () => {
    if (subscriptionDetails?.urls?.updatePaymentMethod) {
      window.open(subscriptionDetails.urls.updatePaymentMethod, "_blank");
    } else {
      window.open("https://app.lemonsqueezy.com/my-orders", "_blank");
    }
  };

  const handleManageSubscription = () => {
    if (subscriptionDetails?.urls?.customerPortal) {
      window.open(subscriptionDetails.urls.customerPortal, "_blank");
    } else {
      window.open("https://app.lemonsqueezy.com/my-orders", "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-500 text-sm">
            Manage your account and subscription.
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-6 rounded-lg border border-gray-200 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {profile?.name || user.user_metadata?.full_name || "User"}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Member since:</span>
              <span className="text-gray-900">{formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className={`p-6 rounded-lg border mb-6 ${
          isPremium
            ? "border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50"
            : "border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isPremium ? "bg-amber-100" : "bg-gray-100"}`}>
                <Crown className={`w-5 h-5 ${isPremium ? "text-amber-600" : "text-gray-400"}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Subscription</h3>
                <p className="text-sm text-gray-500">
                  {isPremium ? "Premium Plan" : "Free Plan"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefreshSubscription}
                disabled={refreshing}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Refresh subscription status"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              </button>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isPremium
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {isPremium ? "Active" : "Free"}
              </span>
            </div>
          </div>

          {isPremium ? (
            <>
              <div className="space-y-3 mb-6 text-sm">
                {/* Status */}
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">
                    {loadingDetails ? "Loading..." : (subscriptionDetails?.subscription?.statusFormatted || "Active")}
                  </span>
                </div>

                {/* Payment Method */}
                {subscriptionDetails?.subscription?.cardLastFour && (
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-gray-900">
                      {subscriptionDetails.subscription.cardBrand?.toUpperCase() || "Card"} ending in {subscriptionDetails.subscription.cardLastFour}
                    </span>
                  </div>
                )}

                {/* Renewal Date */}
                {(profile?.subscription_expires_at || subscriptionDetails?.subscription?.renewsAt) && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {subscriptionDetails?.subscription?.endsAt ? "Ends on:" : "Renews on:"}
                    </span>
                    <span className="text-gray-900">
                      {formatDate(
                        subscriptionDetails?.subscription?.endsAt ||
                        subscriptionDetails?.subscription?.renewsAt ||
                        profile?.subscription_expires_at
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-amber-200 pt-4 space-y-2">
                {/* Update Payment Method */}
                <button
                  onClick={handleUpdatePaymentMethod}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  Update Payment Method
                  <ExternalLink className="w-3 h-3" />
                </button>

                {/* Manage Subscription */}
                <button
                  onClick={handleManageSubscription}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Manage Subscription
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Cancel Info */}
                <p className="text-xs text-center text-gray-500 pt-2">
                  To cancel or view billing history, click &quot;Manage Subscription&quot; above.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Upgrade to Premium to unlock all features including AI coaching, advanced templates, and more.
              </p>
              <Link
                href="/pricing"
                className="block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Upgrade to Premium
              </Link>
            </>
          )}
        </div>

        {/* Premium Features */}
        {isPremium && (
          <div className="p-6 rounded-lg bg-green-50 border border-green-200 mb-6">
            <h3 className="font-semibold text-green-800 mb-3">Your Premium Benefits</h3>
            <ul className="text-sm text-green-700 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                AI-powered feedback on Speaking and Writing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Advanced high-score templates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Detailed performance analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Priority support
              </li>
            </ul>
          </div>
        )}

        {/* Account Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Account</h3>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a href="mailto:support@toeflmaster.org" className="text-gray-900 hover:underline">
              support@toeflmaster.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
