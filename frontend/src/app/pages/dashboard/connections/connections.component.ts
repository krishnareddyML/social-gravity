import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialService } from '@services/social.service';

@Component({
    selector: 'app-connections',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './connections.component.html',
    styleUrl: './connections.component.css'
})
export class ConnectionsComponent implements OnInit {
    connections: any[] = [];
    userId = 1; // Mock user ID for now

    constructor(private socialService: SocialService) { }

    ngOnInit() {
        this.loadConnections();
    }

    loadConnections() {
        this.socialService.getConnections(this.userId).subscribe({
            next: (data) => {
                this.connections = data;
            },
            error: (err) => console.error('Failed to load connections', err)
        });
    }

    isConnected(platform: string): boolean {
        return this.connections.some(c => c.platform === platform && c.connected);
    }

    getUsername(platform: string): string {
        const connection = this.connections.find(c => c.platform === platform && c.connected);
        return connection ? connection.platformUsername : '';
    }

    toggleConnection(platform: string) {
        const connection = this.connections.find(c => c.platform === platform);

        if (connection && connection.connected) {
            // Disconnect
            this.socialService.disconnectPlatform(connection.id).subscribe(() => {
                this.loadConnections();
            });
        } else {
            // Connect
            this.socialService.connectPlatform(this.userId, platform).subscribe(() => {
                this.loadConnections();
            });
        }
    }
}
