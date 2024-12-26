import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import UserHeader from './UserHeader';
import { useAuth } from '../../context/AuthContext';
import { Film, Tv, Clock, Calendar, Star, TrendingUp } from 'lucide-react';

interface ScoreData {
  score: number;
  count: number;
}

interface EpisodeCountData {
  range: string;
  score: number;
}

interface FormatData {
  name: string;
  value: number;
}

interface StatusData {
  name: string;
  value: number;
}

interface ReleaseYearData {
  year: number;
  titles: number;
}

interface WatchYearData {
  year: number;
  titles: number;
}

const scoreData: ScoreData[] = [
  { score: 50, count: 1 },
  { score: 65, count: 1 },
  { score: 75, count: 8 },
  { score: 80, count: 3 },
  { score: 85, count: 10 },
  { score: 90, count: 4 },
  { score: 95, count: 31 },
  { score: 100, count: 19 },
];

const episodeCountData: EpisodeCountData[] = [
  { range: '1', score: 95.63 },
  { range: '7-16', score: 85.09 },
  { range: '17-28', score: 98 },
];

const formatData: FormatData[] = [
  { name: 'TV', value: 91 },
  { name: 'Movie', value: 9 },
];

const statusData: StatusData[] = [
  { name: 'Planning', value: 55 },
  { name: 'Completed', value: 35 },
  { name: 'Watching', value: 6 },
];

const releaseYearData: ReleaseYearData[] = [
  { year: 2009, titles: 1 },
  { year: 2012, titles: 1 },
  { year: 2013, titles: 2 },
  { year: 2014, titles: 1 },
  { year: 2015, titles: 1 },
  { year: 2016, titles: 1 },
  { year: 2018, titles: 2 },
  { year: 2019, titles: 4 },
  { year: 2020, titles: 4 },
  { year: 2021, titles: 10 },
  { year: 2022, titles: 14 },
  { year: 2023, titles: 37 },
  { year: 2024, titles: 9 },
];

const watchYearData: WatchYearData[] = [
  { year: 2023, titles: 49 },
  { year: 2024, titles: 32 },
];

const COLORS = ['#c084fc', '#3b82f6', '#ef4444', '#f59e0b'];

export default function AnimeStatsDashboard() {
  const { auth } = useAuth(); 

  const userData = auth && auth.username && auth.avatar_url && auth.banner_url
    ? {
        username: auth.username,
        avatar_url: auth.avatar_url,
        banner_url: auth.banner_url,
      }
    : null;

  return (
    <div className="custom-container bg-gray-900 text-white pt-8 pb-8">
      <div className='rounded-lg overflow-hidden'>
      <UserHeader userData={userData} loading={!auth} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 mt-8">
        <StatCard title="Total Anime" value="100" icon={<Film className="w-6 h-6" />} />
        <StatCard title="Episodes Watched" value="984" icon={<Tv className="w-6 h-6" />} />
        <StatCard title="Days Watched" value="16.8" icon={<Clock className="w-6 h-6" />} />
        <StatCard title="Days Planned" value="17.2" icon={<Calendar className="w-6 h-6" />} />
        <StatCard title="Mean Score" value="87.18" icon={<Star className="w-6 h-6" />} />
        <StatCard title="Standard Deviation" value="12.1" icon={<TrendingUp className="w-6 h-6" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Score">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="score" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#c084fc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Episode Count">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={episodeCountData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#c084fc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <ChartCard title="Format Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={formatData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
              {formatData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Status Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Country Distribution">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#c084fc]">100%</div>
              <div className="text-xl">Japan</div>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="Release Year">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={releaseYearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="titles" stroke="#c084fc" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Watch Year">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={watchYearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="titles" stroke="#c084fc" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center">
      <div className="mr-4 text-[#c084fc]">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-bold text-[#c084fc]">{value}</div>
      </div>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
