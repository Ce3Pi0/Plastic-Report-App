from pydantic import BaseModel, Field

class ReportCreateSchema(BaseModel):
    lat: str = Field(min_length=1)
    lon: str = Field(min_length=1)