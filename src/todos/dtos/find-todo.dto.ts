export class FindTodoDto {
  userId: string
  completed?: boolean
  limit?: number
  skip?: number
  sort: 'asc' | 'desc'
}
