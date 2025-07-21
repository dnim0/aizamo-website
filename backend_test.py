#!/usr/bin/env python3
"""
Comprehensive Backend Testing for AIzamo Website
Tests all backend API endpoints and functionality before Digital Ocean deployment
"""

import requests
import json
import time
from datetime import datetime
import sys
import os

# Backend URL from frontend environment
BACKEND_URL = "https://75f12f15-79a2-40e5-b76b-fd654601f44b.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = []
        self.passed = 0
        self.failed = 0
        
    def log_result(self, test_name, passed, message, details=None):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = {
            'test': test_name,
            'status': status,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.results.append(result)
        
        if passed:
            self.passed += 1
        else:
            self.failed += 1
            
        print(f"{status}: {test_name}")
        print(f"   {message}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_health_endpoint(self):
        """Test GET /api/health endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'healthy' and data.get('database') == 'connected':
                    self.log_result(
                        "Health Check Endpoint",
                        True,
                        "Health endpoint returns healthy status with database connection",
                        f"Response: {data}"
                    )
                else:
                    self.log_result(
                        "Health Check Endpoint", 
                        False,
                        "Health endpoint returned unexpected data structure",
                        f"Response: {data}"
                    )
            else:
                self.log_result(
                    "Health Check Endpoint",
                    False, 
                    f"Health endpoint returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Health Check Endpoint",
                False,
                f"Failed to connect to health endpoint: {str(e)}"
            )

    def test_root_endpoint(self):
        """Test GET /api/ root endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'message' in data and 'version' in data:
                    self.log_result(
                        "Root API Endpoint",
                        True,
                        "Root endpoint returns proper API information",
                        f"Response: {data}"
                    )
                else:
                    self.log_result(
                        "Root API Endpoint",
                        False,
                        "Root endpoint missing expected fields",
                        f"Response: {data}"
                    )
            else:
                self.log_result(
                    "Root API Endpoint",
                    False,
                    f"Root endpoint returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Root API Endpoint",
                False,
                f"Failed to connect to root endpoint: {str(e)}"
            )

    def test_valid_contact_form_submission(self):
        """Test valid contact form submission with all fields"""
        valid_data = {
            "firstName": "John",
            "lastName": "Doe", 
            "email": "john.doe@example.com",
            "company": "Tech Solutions Inc",
            "phone": "+1 403 800 3135",
            "service": "AI Automations",
            "message": "I need help with AI automation for my business workflows. We're looking to streamline our customer service processes."
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/contact",
                json=valid_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('success') == True and 
                    data.get('contact_id') and 
                    'message' in data):
                    self.log_result(
                        "Valid Contact Form Submission",
                        True,
                        "Contact form accepts valid submission and returns contact_id",
                        f"Contact ID: {data.get('contact_id')}, Message: {data.get('message')}"
                    )
                else:
                    self.log_result(
                        "Valid Contact Form Submission",
                        False,
                        "Contact form response missing required fields",
                        f"Response: {data}"
                    )
            else:
                self.log_result(
                    "Valid Contact Form Submission",
                    False,
                    f"Contact form returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Valid Contact Form Submission",
                False,
                f"Failed to submit contact form: {str(e)}"
            )

    def test_required_field_validation(self):
        """Test required field validation"""
        # Test missing firstName
        missing_firstname = {
            "lastName": "Doe",
            "email": "test@example.com", 
            "service": "AI Automations",
            "message": "Test message for validation"
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/contact",
                json=missing_firstname,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error
                self.log_result(
                    "Required Field Validation (Missing firstName)",
                    True,
                    "API correctly rejects submission missing firstName",
                    f"Status: {response.status_code}"
                )
            else:
                self.log_result(
                    "Required Field Validation (Missing firstName)",
                    False,
                    f"API should return 422 for missing firstName, got {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Required Field Validation (Missing firstName)",
                False,
                f"Error testing required field validation: {str(e)}"
            )

    def test_email_format_validation(self):
        """Test email format validation"""
        invalid_email_data = {
            "firstName": "John",
            "lastName": "Doe",
            "email": "invalid-email-format",
            "service": "AI Automations", 
            "message": "Test message with invalid email"
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/contact",
                json=invalid_email_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error
                self.log_result(
                    "Email Format Validation",
                    True,
                    "API correctly rejects invalid email format",
                    f"Status: {response.status_code}"
                )
            else:
                self.log_result(
                    "Email Format Validation",
                    False,
                    f"API should return 422 for invalid email, got {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Email Format Validation",
                False,
                f"Error testing email validation: {str(e)}"
            )

    def test_message_length_validation(self):
        """Test message length validation (minimum 10 characters)"""
        short_message_data = {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com",
            "service": "AI Automations",
            "message": "Short"  # Only 5 characters
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/contact",
                json=short_message_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error
                self.log_result(
                    "Message Length Validation",
                    True,
                    "API correctly rejects message shorter than 10 characters",
                    f"Status: {response.status_code}"
                )
            else:
                self.log_result(
                    "Message Length Validation",
                    False,
                    f"API should return 422 for short message, got {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Message Length Validation",
                False,
                f"Error testing message length validation: {str(e)}"
            )

    def test_optional_fields(self):
        """Test submission with only required fields (optional fields empty)"""
        minimal_data = {
            "firstName": "Jane",
            "lastName": "Smith",
            "email": "jane.smith@example.com",
            "service": "Web Development",
            "message": "I'm interested in your web development services for my startup."
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/contact",
                json=minimal_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') == True and data.get('contact_id'):
                    self.log_result(
                        "Optional Fields Test",
                        True,
                        "API accepts submission with only required fields",
                        f"Contact ID: {data.get('contact_id')}"
                    )
                else:
                    self.log_result(
                        "Optional Fields Test",
                        False,
                        "API response missing success or contact_id",
                        f"Response: {data}"
                    )
            else:
                self.log_result(
                    "Optional Fields Test",
                    False,
                    f"API returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Optional Fields Test",
                False,
                f"Error testing optional fields: {str(e)}"
            )

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{BACKEND_URL}/contact", timeout=10)
            
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods', 
                'access-control-allow-headers'
            ]
            
            present_headers = []
            for header in cors_headers:
                if header in response.headers:
                    present_headers.append(header)
            
            if len(present_headers) >= 2:  # At least 2 CORS headers present
                self.log_result(
                    "CORS Headers Test",
                    True,
                    f"CORS headers present: {present_headers}",
                    f"Response headers: {dict(response.headers)}"
                )
            else:
                self.log_result(
                    "CORS Headers Test",
                    False,
                    f"Missing CORS headers. Found: {present_headers}",
                    f"Response headers: {dict(response.headers)}"
                )
                
        except Exception as e:
            self.log_result(
                "CORS Headers Test",
                False,
                f"Error testing CORS headers: {str(e)}"
            )

    def test_contact_submissions_endpoint(self):
        """Test GET /api/contact-submissions admin endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/contact-submissions", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result(
                        "Contact Submissions Endpoint",
                        True,
                        f"Admin endpoint returns list of submissions (count: {len(data)})",
                        f"Response type: {type(data)}"
                    )
                else:
                    self.log_result(
                        "Contact Submissions Endpoint",
                        False,
                        "Admin endpoint should return a list",
                        f"Response: {data}"
                    )
            else:
                self.log_result(
                    "Contact Submissions Endpoint",
                    False,
                    f"Admin endpoint returned status code {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Contact Submissions Endpoint",
                False,
                f"Error testing admin endpoint: {str(e)}"
            )

    def test_invalid_json_payload(self):
        """Test handling of invalid JSON payload"""
        try:
            response = requests.post(
                f"{BACKEND_URL}/contact",
                data="invalid json data",
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code in [400, 422]:  # Bad request or validation error
                self.log_result(
                    "Invalid JSON Payload Test",
                    True,
                    f"API correctly handles invalid JSON with status {response.status_code}",
                    f"Response: {response.text}"
                )
            else:
                self.log_result(
                    "Invalid JSON Payload Test",
                    False,
                    f"API should return 400/422 for invalid JSON, got {response.status_code}",
                    f"Response: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Invalid JSON Payload Test",
                False,
                f"Error testing invalid JSON: {str(e)}"
            )

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("AIZAMO BACKEND COMPREHENSIVE TESTING")
        print("=" * 80)
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print("=" * 80)
        print()
        
        # Core API endpoints
        self.test_health_endpoint()
        self.test_root_endpoint()
        
        # Contact form functionality
        self.test_valid_contact_form_submission()
        self.test_optional_fields()
        
        # Validation tests
        self.test_required_field_validation()
        self.test_email_format_validation()
        self.test_message_length_validation()
        
        # Error handling
        self.test_invalid_json_payload()
        
        # Security and admin
        self.test_cors_headers()
        self.test_contact_submissions_endpoint()
        
        # Summary
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.passed + self.failed}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed / (self.passed + self.failed) * 100):.1f}%")
        print()
        
        if self.failed > 0:
            print("FAILED TESTS:")
            for result in self.results:
                if "❌ FAIL" in result['status']:
                    print(f"- {result['test']}: {result['message']}")
        
        print("=" * 80)
        return self.failed == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)