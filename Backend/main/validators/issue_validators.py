from pydantic import BaseModel, Field

class IssueCreateSchema(BaseModel):
    name: str = Field(min_length=1)
    description: str | None = None