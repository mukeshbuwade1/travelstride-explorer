export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          created_at: string
          id: number
          package_id: number | null
          payment_status: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string
          total_amount: number
          user_id: string | null
        }
        Insert: {
          booking_date?: string
          created_at?: string
          id?: number
          package_id?: number | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          total_amount: number
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          created_at?: string
          id?: number
          package_id?: number | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      callback_requests: {
        Row: {
          created_at: string
          full_name: string | null
          id: number
          phone: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: number
          phone: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: number
          phone?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      company_info: {
        Row: {
          about_description: string
          address: string
          created_at: string
          email: string
          id: number
          name: string
          phone: string
        }
        Insert: {
          about_description: string
          address: string
          created_at?: string
          email: string
          id?: number
          name: string
          phone: string
        }
        Update: {
          about_description?: string
          address?: string
          created_at?: string
          email?: string
          id?: number
          name?: string
          phone?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          category: string | null
          created_at: string
          id: number
          image: string
          price: number
          rating: number
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          image: string
          price: number
          rating: number
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          image?: string
          price?: number
          rating?: number
          title?: string
        }
        Relationships: []
      }
      exclusive_offers: {
        Row: {
          code: string
          created_at: string
          description: string
          discount: string
          id: number
          image: string
          title: string
          valid_until: string
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          discount: string
          id?: number
          image: string
          title: string
          valid_until: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          discount?: string
          id?: number
          image?: string
          title?: string
          valid_until?: string
        }
        Relationships: []
      }
      package_itinerary: {
        Row: {
          activities: string[]
          created_at: string
          day: number
          id: number
          package_id: number | null
          title: string
        }
        Insert: {
          activities: string[]
          created_at?: string
          day: number
          id?: number
          package_id?: number | null
          title: string
        }
        Update: {
          activities?: string[]
          created_at?: string
          day?: number
          id?: number
          package_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_itinerary_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          activities: boolean | null
          created_at: string
          description: string
          destination_id: number | null
          duration: string
          flight: boolean | null
          hotel_class: string
          id: number
          image: string
          meals: boolean | null
          name: string
          price: number
          transfer: boolean | null
        }
        Insert: {
          activities?: boolean | null
          created_at?: string
          description: string
          destination_id?: number | null
          duration: string
          flight?: boolean | null
          hotel_class: string
          id?: number
          image: string
          meals?: boolean | null
          name: string
          price: number
          transfer?: boolean | null
        }
        Update: {
          activities?: boolean | null
          created_at?: string
          description?: string
          destination_id?: number | null
          duration?: string
          flight?: boolean | null
          hotel_class?: string
          id?: number
          image?: string
          meals?: boolean | null
          name?: string
          price?: number
          transfer?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "packages_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          booking_id: number | null
          created_at: string
          id: number
          payment_method: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string
          transaction_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          booking_id?: number | null
          created_at?: string
          id?: number
          payment_method?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          transaction_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_id?: number | null
          created_at?: string
          id?: number
          payment_method?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          transaction_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          description: string
          discount: string
          id: number
          image: string
          partner: string
          price: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          discount: string
          id?: number
          image: string
          partner: string
          price: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          discount?: string
          id?: number
          image?: string
          partner?: string
          price?: number
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
