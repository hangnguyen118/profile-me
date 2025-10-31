import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController
} from 'chart.js';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-skill-chart',
  standalone: true,
  templateUrl: './skill-chart.component.html',
  styleUrl: './skill-chart.component.css'
})
export class SkillChartComponent implements AfterViewInit {
  @ViewChild('skillChart') skillChart!: ElementRef<HTMLCanvasElement>;

  datasource = {
    labels: [
      'JavaScript / TypeScript',
      'Angular / React',
      'Node.js / .NET Core',
      'SQL / Database Design',
      'Azure / Cloud Services',
      'DevOps / CI-CD',
      'Security / Best Practices',
      'Problem Solving',
      'System Design',
    ],
    datasets: [
      {
        label: 'Professional Skill Level',
        data: [83, 86, 80, 75, 70, 65, 60, 85, 70],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Learning / Growth Focus',
        data: [97, 98, 89, 80, 77, 97, 70, 86, 97],
        fill: true,
        backgroundColor: 'rgba(244, 114, 182, 0.15)',
        borderColor: 'rgb(244, 114, 182)',
        pointBackgroundColor: 'rgb(244, 114, 182)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(244, 114, 182)',
      },
    ],
  };

  ngAfterViewInit(): void {
    const shiftedLines = this.buildShiftedAngleLinesPlugin('#64748b', 1);
    new Chart(this.skillChart.nativeElement, {
      type: 'radar',
      data: this.datasource,
      options: {
        aspectRatio: 1.5,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25,
              callback: (value) => value.toString() + '%',
              color: '#374151',
              backdropColor: 'transparent',
              font: { size: 10 }
            },
            grid: {
              circular: true,
              color: '#e5e7eb'
            },
            angleLines: { display: false },
            pointLabels: {
              color: '#374151',
              font: { size: 12 }
            }
          }
        },
      },
      plugins: [shiftedLines]
    });
  }

  /**
   * Build the shifted angle lines plugin.
   * @param lineColor angle line color
   * @param lineWidth angle line width
   * @returns the shifted angle lines plugin
   */
  private buildShiftedAngleLinesPlugin(lineColor: string, lineWidth = 1) {
    return {
      id: 'shiftedAngleLines',
      beforeDatasetsDraw: (chart: any) => {
        const scale = chart.scales?.r;
        const labels: string[] = chart.data?.labels ?? [];
        if (!scale || !labels.length) return;

        const ctx = chart.ctx;
        const cx = scale.xCenter;
        const cy = scale.yCenter;
        const radius = scale.drawingArea;

        const step = (Math.PI * 2) / labels.length;
        const offset = step;

        ctx.save();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;

        ctx.setLineDash([3, 3]);

        for (let i = 0; i < labels.length; i++) {
          const a = scale.getIndexAngle(i) + offset;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
          ctx.stroke();
        }
        ctx.restore();
      }
    };
  }
}
