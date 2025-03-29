import { BaseResponse } from "./apiTypes"
import { Slide } from "./slideTypes"

export interface PresentationSaveRequest{
  presentationTitle:string,
  presentationId:string,
  slides: Slide[]
}

export interface PresentationLiveRequest{
  presentationId:string
}
export interface PresentationGetRequest{
  presentationId:string
}
export interface PresentationIsLiveRequest{
  joinCode:string
}

export interface PresentationGetResponse{
  isLive:boolean;
  joinCode:string;
  presenterId:string;
  title:string;
  slideIds:Slide[],
  _id:string
}
export interface PresentationMetaData{
  
  thumbnailURL: string;
  title: string;
  presentationId: string;
}

export interface PresentationIsLiveResponse extends BaseResponse{
  isLive: boolean
}
export interface PresentationLiveResponse extends BaseResponse{}
export interface PresentationCreateResponse extends BaseResponse{
  newPresentation:{ 
    isLive:boolean;
    joinCode:string;
    presenterId:string;
    title:string;
    slideIds:Slide[],
    _id:string
  }
}
export interface PresentationSaveResponse extends BaseResponse{}
export interface PresentationGetResponse extends BaseResponse{
  presentationId:string
  slides: Slide[]
  title:string
  isLive:boolean
  joinCode:string
  presenterId:string
}
export interface PresentationAllResponse extends BaseResponse{
  presentations: PresentationMetaData[]
}
export interface PresentationAllRequest{}