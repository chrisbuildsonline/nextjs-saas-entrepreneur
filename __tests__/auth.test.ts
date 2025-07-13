import { mockSignIn, mockSignUp, mockGetCurrentUser, mockSignOut } from '../lib/auth'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Auth Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('mockSignUp', () => {
    it('should create a mock user and store in localStorage', async () => {
      const email = 'test@example.com'
      const password = 'password123'
      const name = 'Test User'

      const result = await mockSignUp(email, password, name)

      expect(result.user).toBeDefined()
      expect(result.user.email).toBe(email)
      expect(result.user.user_metadata.name).toBe(name)
      expect(result.error).toBeUndefined()
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'mock-user',
        expect.stringContaining(email)
      )
    })
  })

  describe('mockSignIn', () => {
    it('should sign in with any email/password combination', async () => {
      const email = 'test@example.com'
      const password = 'password123'

      const result = await mockSignIn(email, password)

      expect(result.user).toBeDefined()
      expect(result.user.email).toBe(email)
      expect(result.error).toBeUndefined()
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'mock-user',
        expect.stringContaining(email)
      )
    })
  })

  describe('mockGetCurrentUser', () => {
    it('should return user from localStorage', async () => {
      const mockUser = {
        id: 'test-id',
        email: 'test@example.com',
        user_metadata: { name: 'Test User' }
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))

      const result = await mockGetCurrentUser()

      expect(result).toEqual(mockUser)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('mock-user')
    })

    it('should return null if no user in localStorage', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = await mockGetCurrentUser()

      expect(result).toBeNull()
    })
  })

  describe('mockSignOut', () => {
    it('should remove user from localStorage', async () => {
      const result = await mockSignOut()

      expect(result.error).toBeUndefined()
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('mock-user')
    })
  })
})