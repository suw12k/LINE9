#!/usr/bin/env python3
"""
Backend API tests for LINE9 quote system
Tests all endpoints with valid and invalid data
"""
import requests
import json
import sys
from datetime import datetime

# Read base URL from frontend .env
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BASE_URL = line.split('=')[1].strip() + '/api'
            break

print(f"Testing API at: {BASE_URL}")
print("=" * 80)

# Track test results
tests_passed = 0
tests_failed = 0
test_results = []


def test_result(name, passed, details=""):
    global tests_passed, tests_failed
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"  Details: {details}")
    if passed:
        tests_passed += 1
    else:
        tests_failed += 1
    test_results.append({"name": name, "passed": passed, "details": details})
    print()


# Test 1: GET /api/ - Health check
print("Test 1: GET /api/ - Health check")
print("-" * 80)
try:
    response = requests.get(f"{BASE_URL}/", timeout=10)
    expected = {"message": "LINE9 API ready"}
    if response.status_code == 200 and response.json() == expected:
        test_result("GET /api/ health check", True, f"Response: {response.json()}")
    else:
        test_result("GET /api/ health check", False, 
                   f"Status: {response.status_code}, Body: {response.json()}")
except Exception as e:
    test_result("GET /api/ health check", False, f"Exception: {str(e)}")


# Test 2: GET /api/quotes/count - Initial count
print("Test 2: GET /api/quotes/count - Initial count")
print("-" * 80)
try:
    response = requests.get(f"{BASE_URL}/quotes/count", timeout=10)
    if response.status_code == 200:
        initial_count = response.json().get("count", 0)
        test_result("GET /api/quotes/count", True, 
                   f"Initial count: {initial_count}")
    else:
        test_result("GET /api/quotes/count", False, 
                   f"Status: {response.status_code}, Body: {response.text}")
        initial_count = 0
except Exception as e:
    test_result("GET /api/quotes/count", False, f"Exception: {str(e)}")
    initial_count = 0


# Test 3: POST /api/quote - Valid submission
print("Test 3: POST /api/quote - Valid submission")
print("-" * 80)
valid_quote = {
    "full_name": "Jean Dupont",
    "email": "jean.test@example.com",
    "phone": "+33 6 12 34 56 78",
    "country": "France",
    "need": "PC gaming complet",
    "budget": "2000€",
    "usage": "Valorant, Warzone, Cyberpunk 2077",
    "package": "Premium (+ populaire)",
    "wireless": "WiFi 7",
    "color": "Blanc",
    "resolution": "1440p (2K)",
    "case_type": "Verre trempé (esthétique)",
    "rgb": "Oui, full RGB",
    "win_edition": "Famille",
    "message": "Je veux un PC silencieux et performant pour jouer en 1440p ultra",
    "over_18": "Oui",
    "cgv_accepted": True
}

try:
    response = requests.post(f"{BASE_URL}/quote", json=valid_quote, timeout=10)
    if response.status_code == 200:
        data = response.json()
        has_id = "id" in data
        has_email_sent = "email_sent" in data
        has_message = "message" in data
        email_sent_value = data.get("email_sent", None)
        
        if has_id and has_email_sent and has_message:
            test_result("POST /api/quote valid submission", True, 
                       f"ID: {data['id'][:8]}..., email_sent: {email_sent_value}, message: {data['message'][:50]}...")
            print(f"  📧 Email sent status: {email_sent_value}")
            if not email_sent_value:
                print(f"  ⚠️  Email was not sent (check backend logs for Resend error)")
        else:
            test_result("POST /api/quote valid submission", False, 
                       f"Missing fields in response: {data}")
    else:
        test_result("POST /api/quote valid submission", False, 
                   f"Status: {response.status_code}, Body: {response.text}")
except Exception as e:
    test_result("POST /api/quote valid submission", False, f"Exception: {str(e)}")


# Test 4: POST /api/quote - Missing cgv_accepted (should be 400)
print("Test 4: POST /api/quote - Missing cgv_accepted=false (should be 400)")
print("-" * 80)
invalid_cgv = valid_quote.copy()
invalid_cgv["cgv_accepted"] = False

try:
    response = requests.post(f"{BASE_URL}/quote", json=invalid_cgv, timeout=10)
    if response.status_code == 400:
        detail = response.json().get("detail", "")
        if "CGV" in detail or "cgv" in detail.lower():
            test_result("POST /api/quote cgv_accepted=false validation", True, 
                       f"Correctly rejected with 400: {detail}")
        else:
            test_result("POST /api/quote cgv_accepted=false validation", False, 
                       f"Got 400 but wrong message: {detail}")
    else:
        test_result("POST /api/quote cgv_accepted=false validation", False, 
                   f"Expected 400, got {response.status_code}: {response.text}")
except Exception as e:
    test_result("POST /api/quote cgv_accepted=false validation", False, f"Exception: {str(e)}")


# Test 5: POST /api/quote - Invalid email format (should be 422)
print("Test 5: POST /api/quote - Invalid email format (should be 422)")
print("-" * 80)
invalid_email = valid_quote.copy()
invalid_email["email"] = "not-an-email"

try:
    response = requests.post(f"{BASE_URL}/quote", json=invalid_email, timeout=10)
    if response.status_code == 422:
        test_result("POST /api/quote invalid email validation", True, 
                   f"Correctly rejected with 422: {response.json()}")
    else:
        test_result("POST /api/quote invalid email validation", False, 
                   f"Expected 422, got {response.status_code}: {response.text}")
except Exception as e:
    test_result("POST /api/quote invalid email validation", False, f"Exception: {str(e)}")


# Test 6: POST /api/quote - Missing required field (should be 422)
print("Test 6: POST /api/quote - Missing required field full_name (should be 422)")
print("-" * 80)
missing_field = valid_quote.copy()
del missing_field["full_name"]

try:
    response = requests.post(f"{BASE_URL}/quote", json=missing_field, timeout=10)
    if response.status_code == 422:
        test_result("POST /api/quote missing required field validation", True, 
                   f"Correctly rejected with 422: {response.json()}")
    else:
        test_result("POST /api/quote missing required field validation", False, 
                   f"Expected 422, got {response.status_code}: {response.text}")
except Exception as e:
    test_result("POST /api/quote missing required field validation", False, f"Exception: {str(e)}")


# Test 7: GET /api/quotes/count - Verify count increased
print("Test 7: GET /api/quotes/count - Verify count increased after submission")
print("-" * 80)
try:
    response = requests.get(f"{BASE_URL}/quotes/count", timeout=10)
    if response.status_code == 200:
        new_count = response.json().get("count", 0)
        if new_count > initial_count:
            test_result("GET /api/quotes/count after submission", True, 
                       f"Count increased from {initial_count} to {new_count}")
        else:
            test_result("GET /api/quotes/count after submission", False, 
                       f"Count did not increase: initial={initial_count}, current={new_count}")
    else:
        test_result("GET /api/quotes/count after submission", False, 
                   f"Status: {response.status_code}, Body: {response.text}")
except Exception as e:
    test_result("GET /api/quotes/count after submission", False, f"Exception: {str(e)}")


# Summary
print("=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"Total tests: {tests_passed + tests_failed}")
print(f"✅ Passed: {tests_passed}")
print(f"❌ Failed: {tests_failed}")
print()

if tests_failed > 0:
    print("FAILED TESTS:")
    for result in test_results:
        if not result["passed"]:
            print(f"  - {result['name']}: {result['details']}")
    sys.exit(1)
else:
    print("🎉 All tests passed!")
    sys.exit(0)
