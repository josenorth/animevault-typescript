'use client'

import { useState } from 'react'
import { 

  Button,
  Card,
  CardContent,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,

} from '@mui/material'
import { 
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
  Notifications as BellIcon,
  NotificationsOff as BellOffIcon,
  Person as UserIcon,
  Security as ShieldIcon,
  Language as GlobeIcon,
} from '@mui/icons-material'
import ProfileSettings from './settings/UserAvatarBanner'

const sidebarItems = [
  { icon: UserIcon, label: 'Profile', id: 'profile' },
  { icon: ShieldIcon, label: 'Security', id: 'security' },
  { icon: BellIcon, label: 'Notifications', id: 'notifications' },
  { icon: GlobeIcon, label: 'Language', id: 'language' },
]

export default function UserConfigPanel() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [activePanel, setActivePanel] = useState('profile')


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const renderPanel = () => {
    switch (activePanel) {
      case 'profile':
        return <ProfilePanel />
      case 'security':
        return <SecurityPanel />
      case 'notifications':
        return <NotificationsPanel notificationsEnabled={notificationsEnabled} setNotificationsEnabled={setNotificationsEnabled} />
      case 'language':
        return <LanguagePanel />
      default:
        return <ProfilePanel />
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-5xl mx-auto p-4 space-y-6">

      <ProfileSettings />

        <Card className="mt-12">
          <CardContent className="flex p-0">
            {/* Minimalist sidebar */}
            <aside className="w-16 md:w-20 border-r border-gray-200 flex flex-col items-center py-6 space-y-6">
              {sidebarItems.map((item) => (
                <IconButton
                  key={item.id}
                  onClick={() => setActivePanel(item.id)}
                  color={activePanel === item.id ? 'primary' : 'default'}
                  title={item.label}
                >
                  <item.icon />
                </IconButton>
              ))}
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <Typography variant="h4">
                  {sidebarItems.find(item => item.id === activePanel)?.label}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                      name="darkMode"
                      color="primary"
                    />
                  }
                  label={isDarkMode ? <MoonIcon /> : <SunIcon />}
                />
              </div>

              {renderPanel()}

              <Button variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </main>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProfilePanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          placeholder="John Doe"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          placeholder="john@example.com"
        />
      </div>
      <TextField
        label="Bio"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        placeholder="Tell us about yourself"
      />
    </div>
  )
}

function SecurityPanel() {
  return (
    <div className="space-y-4">
      <TextField
        label="Current Password"
        variant="outlined"
        fullWidth
        type="password"
      />
      <TextField
        label="New Password"
        variant="outlined"
        fullWidth
        type="password"
      />
      <TextField
        label="Confirm New Password"
        variant="outlined"
        fullWidth
        type="password"
      />
    </div>
  )
}
interface NotificationsPanelProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

function NotificationsPanel({ notificationsEnabled, setNotificationsEnabled }: NotificationsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              name="notifications"
              color="primary"
            />
          }
          label="Enable Notifications"
        />
        {notificationsEnabled ? <BellIcon /> : <BellOffIcon />}
      </div>
      <TextField
        label="Notification Email"
        variant="outlined"
        fullWidth
        type="email"
        placeholder="notifications@example.com"
      />
    </div>
  )
}

function LanguagePanel() {
  return (
    <div className="space-y-4">
      <Select
        label="Preferred Language"
        variant="outlined"
        fullWidth
        defaultValue=""
      >
        <MenuItem value="">
          <em>Select a language</em>
        </MenuItem>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
      </Select>
      <Select
        label="Timezone"
        variant="outlined"
        fullWidth
        defaultValue=""
      >
        <MenuItem value="">
          <em>Select a timezone</em>
        </MenuItem>
        <MenuItem value="utc">UTC</MenuItem>
        <MenuItem value="est">Eastern Time</MenuItem>
        <MenuItem value="pst">Pacific Time</MenuItem>
      </Select>
    </div>
  )
}