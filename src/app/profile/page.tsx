"use client";

import Link from "next/link";
import { ArrowLeft, User, Crown, Mail, Calendar, CreditCard, ExternalLink, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, profile, isPremium, loading, signOut } = useAuth();
  const router = useRouter();
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth?redirect=/profile");
    }
  }, [loading, user, router]);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleManageSubscription = async () => {
    // Redirect to Lemon Squeezy customer portal
    // In production, this would fetch the portal URL from your backend
    window.open("https://app.lemonsqueezy.com/my-orders", "_blank");
  };

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.")) {
      return;
    }

    setCancelLoading(true);
    try {
      // In production, call your API to cancel the subscription via Lemon Squeezy
      alert("To cancel your subscription, please visit the Lemon Squeezy customer portal.");
      window.open("https://app.lemonsqueezy.com/my-orders", "_blank");
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Failed to cancel subscription. Please try again.");
    } finally {
      setCancelLoading(false);
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

  const formatDate = (dateString: string | null) => {
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
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isPremium
                ? "bg-amber-100 text-amber-700"
                : "bg-gray-100 text-gray-600"
            }`}>
              {isPremium ? "Active" : "Free"}
            </span>
          </div>

          {isPremium ? (
            <>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                {profile?.subscription_expires_at && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Renews on:</span>
                    <span className="text-gray-900">{formatDate(profile.subscription_expires_at)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-amber-200 pt-4 space-y-2">
                <button
                  onClick={handleManageSubscription}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Manage Subscription
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={cancelLoading}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  {cancelLoading ? "Processing..." : "Cancel Subscription"}
                </button>
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
              <li>✓ AI-powered feedback on Speaking and Writing</li>
              <li>✓ Advanced high-score templates</li>
              <li>✓ Detailed performance analytics</li>
              <li>✓ Priority support</li>
            </ul>
          </div>
        )}

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
