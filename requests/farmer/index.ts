import { DeleteRequestResponse, FarmerRequest, PostRequestResponse, PutRequestResponse } from "@/types";
import { postRequest } from "@/requests/post";
import { putRequest } from "@/requests/put";
import { deleteRequest } from "@/requests/delete";

export const createFarmer = async (body: FarmerRequest.Create.Request): Promise<PostRequestResponse<FarmerRequest.Create.Response>> => {
  const response = await postRequest<FarmerRequest.Create.Request, FarmerRequest.Create.Response>(`/api/farmer/create`, body)

  if (!response.ok) {
    throw new Error('Failed to create farmer');
  }

  return response
}

export const updateFarmer = async (farmerId: string, body: FarmerRequest.Update.Request): Promise<PutRequestResponse<FarmerRequest.Update.Response>> => {
  const response = await putRequest<FarmerRequest.Update.Request, FarmerRequest.Update.Response>(`/api/farmer/update/${farmerId}`, body)

  if (!response.ok) {
    throw new Error('Failed to update farmer');
  }

  return response
}

export const deleteFarmer = async (farmerId: string): Promise<DeleteRequestResponse<FarmerRequest.Delete.Response>> => {
  const response = await deleteRequest<FarmerRequest.Delete.Response>(`/api/farmer/delete/${farmerId}`);

  if (!response.ok) {
    throw new Error('Failed to delete farmer');
  }

  return response;
};