import httpx
import os
import logging
from typing import Dict, Optional

logger = logging.getLogger(__name__)

# GoHighLevel API Configuration
GHL_API_KEY = os.getenv("GHL_API_KEY", "")
GHL_BASE_URL = "https://services.leadconnectorhq.com"
GHL_LOCATION_ID = os.getenv("GHL_LOCATION_ID", "")

class GoHighLevelError(Exception):
    """Custom exception for GoHighLevel API errors"""
    pass

async def create_ghl_contact(contact_data: dict) -> Optional[Dict]:
    """
    Create a contact in GoHighLevel CRM
    
    Args:
        contact_data: Dictionary containing contact information
        
    Returns:
        Dictionary with GoHighLevel contact response or None if disabled
    """
    if not GHL_API_KEY:
        logger.warning("GoHighLevel API key not configured, skipping contact creation")
        return None
    
    # Map your form data to GoHighLevel format
    ghl_payload = {
        "firstName": contact_data.get("firstName", ""),
        "lastName": contact_data.get("lastName", ""),
        "name": f"{contact_data.get('firstName', '')} {contact_data.get('lastName', '')}".strip(),
        "email": contact_data.get("email", ""),
        "phone": contact_data.get("phone", ""),
        "source": "AIzamo Website",
        "tags": ["Website Lead", "AI Automation Inquiry"],
    }
    
    # Add company as custom field if provided
    if contact_data.get("company"):
        ghl_payload["companyName"] = contact_data["company"]
    
    # Add service interest as custom field
    if contact_data.get("service"):
        ghl_payload["customFields"] = [
            {
                "key": "service_interest",
                "field_value": contact_data["service"]
            }
        ]
    
    # Add message as notes
    if contact_data.get("message"):
        ghl_payload["notes"] = contact_data["message"]
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{GHL_BASE_URL}/contacts/",
                json=ghl_payload,
                headers={
                    "Authorization": f"Bearer {GHL_API_KEY}",
                    "Version": "2021-07-28",
                    "Content-Type": "application/json"
                }
            )
            
            if response.status_code == 200:
                result = response.json()
                logger.info(f"Successfully created GHL contact: {result.get('contact', {}).get('id', 'unknown')}")
                return result
            else:
                logger.error(f"GoHighLevel API error: {response.status_code} - {response.text}")
                raise GoHighLevelError(f"Failed to create contact: {response.status_code}")
                
    except httpx.TimeoutException:
        logger.error("GoHighLevel API timeout")
        raise GoHighLevelError("API timeout while creating contact")
    except httpx.RequestError as e:
        logger.error(f"GoHighLevel API request error: {str(e)}")
        raise GoHighLevelError(f"API request failed: {str(e)}")

async def create_ghl_task(contact_id: str, task_data: dict) -> Optional[Dict]:
    """
    Create a task for a contact in GoHighLevel
    
    Args:
        contact_id: GoHighLevel contact ID
        task_data: Dictionary containing task information
        
    Returns:
        Dictionary with GoHighLevel task response or None if disabled
    """
    if not GHL_API_KEY or not contact_id:
        logger.warning("GoHighLevel API key or contact ID missing, skipping task creation")
        return None
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{GHL_BASE_URL}/contacts/{contact_id}/tasks",
                json=task_data,
                headers={
                    "Authorization": f"Bearer {GHL_API_KEY}",
                    "Version": "2021-07-28",
                    "Content-Type": "application/json"
                }
            )
            
            if response.status_code in [200, 201]:
                result = response.json()
                logger.info(f"Successfully created GHL task for contact {contact_id}")
                return result
            else:
                logger.error(f"GoHighLevel task creation error: {response.status_code} - {response.text}")
                raise GoHighLevelError(f"Failed to create task: {response.status_code}")
                
    except httpx.TimeoutException:
        logger.error("GoHighLevel API timeout for task creation")
        raise GoHighLevelError("API timeout while creating task")
    except httpx.RequestError as e:
        logger.error(f"GoHighLevel task API request error: {str(e)}")
        raise GoHighLevelError(f"Task API request failed: {str(e)}")

async def trigger_ghl_workflow(contact_id: str, workflow_id: str) -> Optional[Dict]:
    """
    Trigger a workflow for a contact in GoHighLevel
    
    Args:
        contact_id: GoHighLevel contact ID
        workflow_id: GoHighLevel workflow ID to trigger
        
    Returns:
        Dictionary with workflow trigger response or None if disabled
    """
    if not GHL_API_KEY or not contact_id or not workflow_id:
        logger.warning("GoHighLevel credentials or IDs missing, skipping workflow trigger")
        return None
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{GHL_BASE_URL}/workflows/{workflow_id}/subscribe",
                json={"contactId": contact_id},
                headers={
                    "Authorization": f"Bearer {GHL_API_KEY}",
                    "Version": "2021-07-28",
                    "Content-Type": "application/json"
                }
            )
            
            if response.status_code in [200, 201]:
                result = response.json()
                logger.info(f"Successfully triggered workflow {workflow_id} for contact {contact_id}")
                return result
            else:
                logger.error(f"GoHighLevel workflow trigger error: {response.status_code} - {response.text}")
                raise GoHighLevelError(f"Failed to trigger workflow: {response.status_code}")
                
    except httpx.TimeoutException:
        logger.error("GoHighLevel API timeout for workflow trigger")
        raise GoHighLevelError("API timeout while triggering workflow")
    except httpx.RequestError as e:
        logger.error(f"GoHighLevel workflow API request error: {str(e)}")
        raise GoHighLevelError(f"Workflow API request failed: {str(e)}")